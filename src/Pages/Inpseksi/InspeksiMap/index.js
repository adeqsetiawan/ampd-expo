import * as Camera from "expo-camera";
import { isLoaded } from "expo-font";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { FAB, Portal, Provider, Button } from "react-native-paper";

const InspeksiMap = (props) => {
  const [state, setState] = useState({
    location: "",
    errorMsg: "",
    tiang: [],
    isLoading: true,
    open: false,
  });
  const [hasPermission, setHasPermission] = useState(null);
  const onStateChange = ({ open }) =>
    setState((prevstate) => ({
      ...prevstate,
      open: open,
    }));

  const permision = async () => {
    const { status } = await Location.requestPermissionsAsync();
    const { camera } = await Camera.requestPermissionsAsync();
    if (status || camera !== "granted") {
      console.log("Kamera Gagal");
    }
    const location = await Location.getCurrentPositionAsync({});
    setState((prevstate) => ({
      ...prevstate,
      location: location,
    }));
  };

  const handleButton = async (
    idtiang,
    idjtm,
    nmTiang,
    nmJTM,
    nmRayon,
    modal
  ) => {
    await AsyncStorage.setItem("_dataInspeksi_Tiang", nmTiang);
    await AsyncStorage.setItem("_dataInspeksi_Jtm", nmJTM);
    await AsyncStorage.setItem("_dataInspeksi_Rayon", nmRayon);
    await AsyncStorage.setItem("_dataInspeksi_id_Tiang", idtiang);
    await AsyncStorage.setItem("_dataInspeksi_id_Jtm", idjtm);
    props.navigations("InspeksiMapProses");
  };

  const loadData = async () => {
    permision();
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setState((prevstate) => ({
        ...prevstate,
        errorMsg: "Permission to access location was denied",
      }));
    }
    const location = await Location.getCurrentPositionAsync({});

    setState((prevstate) => ({
      ...prevstate,
      location: location,
      mylatitude: location.coords.latitude,
      mylongitude: location.coords.longitude,
    }));
  };
  const refresh = async () => {
    const prevData2 = await AsyncStorage.getItem("Inspeksi_tiang");
    if (prevData2 == "Data Kosong" || prevData2 == null || prevData2 == "") {
      await AsyncStorage.setItem("Inspeksi_tiang", "Data Kosong");
      Alert.alert("ERROR", "Data Tiang Masih Kosong. Harap Masukkan Kode TO");
    } else {
      setState((prevstate) => ({
        ...prevstate,
        tiang: JSON.parse(prevData2),
        isLoading: false,
      }));
    }
    loadData();
  };

  useEffect(() => {
    refresh();
    loadData();
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    refresh();
  }, [state.isLoading]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (state.isLoading == true) {
    return (
      <View style={{ margin: 30, alignSelf: "center" }}>
        <Text>Data Tiang Masih Kosong, Masukkan Kode TO terlebih dahulu.</Text>
        <Button onPress={() => refresh()}>
          <Text>Refresh</Text>
        </Button>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <MapView
            showsUserLocation
            style={styles.mapStyle}
            initialRegion={{
              latitude: -5.3968896,
              longitude: 105.2540928,
              latitudeDelta: 0.11,
              longitudeDelta: 0.14,
            }}
          >
            {state.tiang.map((marker) => (
              <Marker
                key={marker.idtiang}
                draggable
                coordinate={{
                  latitude: parseFloat(marker.koordinat_x),
                  longitude: parseFloat(marker.koordinat_y),
                }}
              >
                <Callout
                  onPress={() =>
                    handleButton(
                      marker.idtiang,
                      marker.idjtm,
                      marker.notiang,
                      marker.penyulang,
                      marker.rayon,
                      true
                    )
                  }
                >
                  <View
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <View style={{ margin: 30 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        ULP/RAYON: {marker.rayon}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        JTM/PENYULANG: {marker.penyulang}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        TIANG: {marker.notiang}
                      </Text>
                      <View style={{ padding: 5 }} />
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Terdapat Temuan pada tiang ini?
                      </Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
        <Provider>
          <Portal>
            <FAB.Group
              open={state.open}
              icon={state.open ? "menu" : "settings"}
              actions={[
                {
                  icon: "database-import",
                  label: "Data Inspeksi",
                  onPress: () => {
                    props.navigations("InspeksiHasil");
                  },
                },
                {
                  icon: "refresh",
                  label: "Refresh",
                  onPress: () => refresh(),
                },
              ]}
              onStateChange={onStateChange}
            />
          </Portal>
        </Provider>
      </>
    );
  }
};

export default InspeksiMap;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  fab: {
    position: "absolute",
    backgroundColor: "red",
    margin: 16,
    right: 70,
    bottom: 35,
  },
});
