import * as Camera from "expo-camera";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Button, FAB, Portal, Provider } from "react-native-paper";
import { getDistance, getPreciseDistance } from "geolib";

const PemeliharaanMap = (props) => {
  const [state, setState] = useState({
    location: "",
    errorMsg: "",
    tiang: [],
    isLoading: true,
    open: false,
    mylatitude: "",
    mylongitude: "",
  });

  const [stateDataKirim, setstateDataKirim] = useState({
    datanya: [],
  });

  const [hasPermission, setHasPermission] = useState(null);
  const onStateChange = ({ open }) =>
    setState((prevstate) => ({
      ...prevstate,
      open: open,
    }));

  const permision = async () => {
    await Location.requestPermissionsAsync();
    await Camera.requestPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    setState((prevstate) => ({
      ...prevstate,
      location: location,
    }));
  };

  const handleButton = async (idsurvey, lat, long) => {
    const dis = getDistance(
      { latitude: state.mylatitude, longitude: state.mylongitude },
      { latitude: lat, longitude: long }
    );
    if (dis >= 200) {
      Alert.alert(
        "ERROR",
        "Jarak Anda ke Lokasi: " +
          dis +
          " M atau " +
          dis / 1000 +
          " KM. Jarak Pointing Minimal 200 Meter. Silahkan mendekat ke Titik Lokasi"
      );
    } else {
      const newState = state.tiang.filter((val) => val.idsurvey === idsurvey);
      // console.log(stateDataKirim.datanya[0].lokasi);

      await AsyncStorage.setItem(
        "_dataPemeliharaan_Tiang",
        JSON.stringify(newState)
      );
      props.navigations("PemeliharaanMapProses");
    }
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
    const prevData2 = await AsyncStorage.getItem("Pemeliharaan_tiang");
    if (prevData2 == "Data Kosong" || prevData2 == null || prevData2 == "") {
      await AsyncStorage.setItem("Pemeliharaan_tiang", "Data Kosong");
      Alert.alert(
        "ERROR",
        "Data TO Pemeliharaan Kosong. Harap Masukkan Kode Target Operasi (TO)"
      );
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
                key={marker.idsurvey}
                draggable
                coordinate={{
                  latitude: parseFloat(marker.koordinat_x),
                  longitude: parseFloat(marker.koordinat_y),
                }}
              >
                <Callout
                  onPress={() =>
                    handleButton(
                      marker.idsurvey,
                      marker.koordinat_x,
                      marker.koordinat_y
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
                  label: "Data Pemeliharaan",
                  onPress: () => {
                    props.navigations("PemeliharaanHasil");
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

export default PemeliharaanMap;

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
