import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, AsyncStorage, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const DownloadTO = (props) => {
  const inputTO = useRef(null);
  const [state, setState] = useState({
    dataWO: "kosong",
    isLoading: false,
    nama_area: "",
    nama_rayon: "",
    nama_jtm: "",
    memory: "",
  });

  const _procTO = (value) => {
    setState((prefstate) => ({
      ...prefstate,
      dataWO: value,
      isLoading: true,
    }));
  };
  useEffect(() => {
    console.log(state);
  }, []);

  const simpanDataTO = async () => {
    const dataTO = state.dataWO.toUpperCase();
    try {
      const { data } = await axios.get(
        "http://27.50.27.157/amadis/index.php/android/get_tiangjtm_wo/" +
          dataTO +
          "/2.6/imei/"
      );
      inputTO.current.clear();

      if (data.Tiang == "" || data.Tiang == []) {
        props.HandleisLoading();

        Alert.alert("Error", "Kode Target Operasi Salah");
        inputTO.current.clear();
      } else {
        console.log(props);
        props.HandleisLoading(false);

        setState((prefstate) => ({
          ...prefstate,
          memory: data.Tiang,
        }));
        await AsyncStorage.setItem(
          "Inspeksi_tiang",
          JSON.stringify(data.Tiang)
        );
        Alert.alert("Berhasil", "Data Tiang berhasil di Unduh");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _handleTO = () => {
    if (state.dataWO == "kosong" || state.dataWO == "") {
      Alert.alert("ERROR", "Data TO Kosong, Mohon Input terlebih dahulu");
    } else {
      Alert.alert(
        "Peringatan",
        "Anda memilih Data TO. Apakah anda ingin merubah Data tiang ke data Target Operasi?",
        [
          {
            text: "BATAL",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "SETUJU", onPress: () => simpanDataTO() },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <View style={{ paddingTop: 10 }} />
      <View style={{}}>
        <TextInput
          ref={inputTO}
          clear={true}
          style={{
            paddingBottom: 10,
            color: "#2e8b57",
          }}
          mode="outlined"
          label="Kode Target Operasi - TO"
          onChangeText={(value) => _procTO(value)}
        />
        <Button
          mode="contained"
          icon="download"
          style={{
            backgroundColor: "sandybrown",
          }}
          onPress={() => _handleTO()}
        >
          <Text>DOWNLOAD TO</Text>
        </Button>
      </View>
    </View>
  );
};
export default DownloadTO;
