import { Picker } from "@react-native-community/picker";
import { Camera } from "expo-camera";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import DataContext from "../../../Context/DataContext";
import { RestApi } from "../../../api";
import axios from "axios";

const PemeliharaanMapProses = ({ navigation }) => {
  const { data, setData } = useContext(DataContext);
  const [dataSementara, setDataSementara] = useState({
    _dataTiang: "",
  });
  const [imageDw, setimageDw] = useState({
    _dataFoto: "",
  });
  const [kodewo, setkodewo] = useState({
    kode_wo: "",
    id_survey: "",
  });
  const [modalViewimage, setmodalViewimage] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uriCam, seturiCam] = useState(null);
  const [camModal, setcamModal] = useState(false);
  const [stateInput, setInput] = useState({
    _statusPemeliharaan: "---",
    _tindakanPemeliharaan: "",
    _materialPemeliharaan: "",
  });
  const cameraRef = useRef(null);
  const [isLoading, setisLoading] = useState(true);

  const onHandlinginput = (value, state) => {
    setInput((prevstate) => ({
      ...prevstate,
      [state]: value,
    }));
    console.log(stateInput);
  };

  const onValueChange = (value) => {
    setInput((prevstate) => ({
      ...prevstate,
      _statusPemeliharaan: value,
    }));
  };

  const handleCam = (value) => {
    setcamModal(value);
  };
  const handleViewImg = (value) => {
    setmodalViewimage(value);
    loadImages();
  };

  const ambilGambar = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        skipProcessing: true,
      });
      console.log(photo);
      console.log(photo.uri);
      seturiCam(photo.uri);
      setcamModal(false);
    }
  };

  const loadFoto = () => {
    if (uriCam == null) {
      return (
        <>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => handleCam(true)}
              style={{ paddingBottom: 10 }}
            >
              <IconButton
                icon="camera"
                color={"grey"}
                style={{ backgroundColor: "white", alignSelf: "center" }}
                size={70}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 9,
              color: "grey",
            }}
          >
            Catatan: Tekan Icon Kamera untuk mengambil gambar lapangan.
          </Text>
        </>
      );
    } else {
      const urlPhoto = uriCam;
      return (
        <View>
          <Image
            source={{ uri: urlPhoto }}
            style={{ alignSelf: "center", width: 100, height: 100 }}
          />
          <Text
            style={{
              fontSize: 9,
              color: "grey",
            }}
          >
            Catatan: Tekan Hasil Gambar untuk mengambil ulang.
          </Text>
        </View>
      );
    }
  };

  const MemorySaveLocal = async () => {
    const hasilPemeliharaan = {
      area: dataSementara._dataTiang[0].area,
      idjtm: dataSementara._dataTiang[0].idjtm,
      idsurvey: dataSementara._dataTiang[0].idsurvey,
      idtiang: dataSementara._dataTiang[0].idtiang,
      kdpemilik: dataSementara._dataTiang[0].kdpemilik,
      kdpengelola: dataSementara._dataTiang[0].kdpengelola,
      kode_wo: dataSementara._dataTiang[0].kode_wo,
      kondisi: dataSementara._dataTiang[0].kondisi,
      koordinat_x: dataSementara._dataTiang[0].koordinat_x,
      koordinat_y: dataSementara._dataTiang[0].koordinat_y,
      lokasi: dataSementara._dataTiang[0].lokasi,
      material: dataSementara._dataTiang[0].material,
      notiang: dataSementara._dataTiang[0].notiang,
      padam: dataSementara._dataTiang[0].padam,
      penyulang: dataSementara._dataTiang[0].penyulang,
      rayon: dataSementara._dataTiang[0].rayon,
      status: dataSementara._dataTiang[0].status,
      tglsurvey: dataSementara._dataTiang[0].tglsurvey,
      tier11: dataSementara._dataTiang[0].tier11,
      tier12: dataSementara._dataTiang[0].tier12,
      tier13: dataSementara._dataTiang[0].tier13,
      tier14: dataSementara._dataTiang[0].tier14,
      tier21: dataSementara._dataTiang[0].tier21,
      tier22: dataSementara._dataTiang[0].tier22,
      tier23: dataSementara._dataTiang[0].tier23,
      tier24: dataSementara._dataTiang[0].tier24,
      tindakan: dataSementara._dataTiang[0].tindakan,
      _statusPemeliharaan: stateInput._statusPemeliharaan,
      _tindakanPemeliharaan: stateInput._tindakanPemeliharaan,
      _materialPemeliharaan: stateInput._materialPemeliharaan,
      status_uploader: false,
      photo: uriCam,
    };

    const prevHasilPemeliharaan = await AsyncStorage.getItem(
      "_HasilPemeliharaan"
    );
    const prevData = JSON.parse(prevHasilPemeliharaan);
    prevData.push(hasilPemeliharaan);
    await AsyncStorage.setItem("_HasilPemeliharaan", JSON.stringify(prevData));
    console.log(prevData.map((_data) => _data.idsurvey));
  };

  const SimpanProses = async () => {
    if (
      stateInput._statusPemeliharaan == "" ||
      stateInput._tindakanPemeliharaan == "" ||
      stateInput._materialPemeliharaan == ""
    ) {
      Alert.alert(
        "Peringatan",
        "Status Pemeliharaan, Tindakan atau Material Masih Kosong. Harap isi Terlebih Dahulu"
      );
    } else if (!uriCam) {
      Alert.alert("Peringatan", "Anda belum mengambil gambar");
    } else {
      MemorySaveLocal();

      Alert.alert(
        "BERHASIL",
        "Data Pemeliharaan Berhasil di Proses.",
        [{ text: "OK", onPress: () => navigation.navigate("Pemeliharaan") }],
        { cancelable: false }
      );
    }
  };

  const loadData = async () => {
    const _dataTiang = await AsyncStorage.getItem("_dataPemeliharaan_Tiang");
    const setDatas = JSON.parse(_dataTiang);
    setDataSementara({
      _dataTiang: setDatas,
    });
    setkodewo({
      kode_wo: setDatas[0].kode_wo,
      id_survey: setDatas[0].idsurvey,
    });
    console.log(setDatas);

    try {
      const prevHasilPemeliharaan = await AsyncStorage.getItem(
        "_HasilPemeliharaan"
      );

      if (
        prevHasilPemeliharaan == "Data Kosong" ||
        prevHasilPemeliharaan == null ||
        prevHasilPemeliharaan == ""
      ) {
        await AsyncStorage.setItem("_HasilPemeliharaan", "[]");
        setisLoading(false);
      } else {
        const prevData = JSON.parse(prevHasilPemeliharaan);
        if (prevData.some((_data) => _data.idsurvey == setDatas[0].idsurvey)) {
          Alert.alert(
            "PERINGATAN",
            "Data ini sudah ada. Jika ingin Ada Perubahan pada Pemeliharaan ini, Anda Harus menghapus terlebih Dahulu Data yang ada di Memory.",
            [
              {
                text: "KEMBALI",
                onPress: () => navigation.navigate("Pemeliharaan"),
              },
            ],
            { cancelable: false }
          );
        }
        setisLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadImages = async () => {
    const UrlBase = RestApi.BASEURL;
    const Urls = RestApi.CMD_GET_PEMELIHARAAN_TIANG_WO_FOTO_INSPEKSI;
    const ImageDownload =
      UrlBase +
      Urls +
      "/" +
      kodewo.kode_wo +
      "/" +
      kodewo.id_survey +
      "/2.6/imei";

    try {
      const { data } = await axios.get(ImageDownload);
      setimageDw({
        _dataFoto: data.Foto[0].foto,
      });
      console.log(imageDw);
    } catch (err) {
      console.log(err);
    }
  };

  const imageShow = () => {
    if (imageDw._dataFoto !== "" || imageDw._dataFoto !== null) {
      return (
        <View>
          <Image
            source={{
              uri:
                "http://27.50.27.157/amadis/public/foto/survey/" +
                imageDw._dataFoto,
            }}
            style={{ alignSelf: "center", width: 300, height: 300 }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Data gagal di Download</Text>
        </View>
      );
    }
  };

  const hideModalUtama = async () => {
    await AsyncStorage.removeItem("_dataPemeliharaan_Tiang");
    await AsyncStorage.removeItem("_dataPemeliharaan_Jtm");
    await AsyncStorage.removeItem("_dataPemeliharaan_Rayon");
    await AsyncStorage.removeItem("_dataPemeliharaan_id_Tiang");
    await AsyncStorage.removeItem("_dataPemeliharaan_id_Jtm");
    navigation.navigate("Pemeliharaan");
  };

  const alertHideModalUtama = () => {
    Alert.alert(
      "Konfirmasi",
      "Anda yakin Ingin keluar dari Aksi ini?",
      [
        {
          text: "BATAL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "YAKIN", onPress: () => hideModalUtama() },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const padamCheck = (val) => {
    if (val == 0) {
      return "Tidak Padam";
    } else {
      return "Pemadanaman";
    }
  };

  const statusCheck = (val) => {
    if (val == 0) {
      return "Kurang";
    } else if (val == 1) {
      return "Buruk";
    } else {
      return "Baik / Cukup";
    }
  };

  if (isLoading == true) {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={{ paddingTop: 30 }} />
              {loadFoto()}
              <View style={{ paddingTop: 10 }} />
              <Button
                style={{ backgroundColor: "teal" }}
                onPress={() => handleViewImg(!modalViewimage)}
              >
                <Text style={{ color: "white" }}>Lihat Foto Inspeksi</Text>
              </Button>
              <View style={{ paddingTop: 10 }} />
            </View>
            <View>
              <View
                style={{
                  backgroundColor: "grey",
                  paddingBottom: 3,
                }}
              />
              <View
                style={{
                  backgroundColor: "cornflowerblue",
                  width: 300,
                  marginBottom: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: "white",
                    alignContent: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  DATA TIANG
                </Text>
              </View>
              <TextInput
                style={{ width: 300 }}
                label={"ID Tiang"}
                mode="outlined"
                value={dataSementara._dataTiang[0].idtiang}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Nama/Nomor Tiang"}
                mode="outlined"
                value={dataSementara._dataTiang[0].notiang}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Penyulang"}
                mode="outlined"
                value={dataSementara._dataTiang[0].penyulang}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Rayon"}
                mode="outlined"
                value={dataSementara._dataTiang[0].rayon}
                disabled={true}
              />

              <View
                style={{
                  backgroundColor: "lightcoral",
                  width: 300,
                  marginBottom: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: "white",
                    alignContent: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  DATA TEMUAN
                </Text>
              </View>
              <TextInput
                style={{ width: 300 }}
                label={"Penunjuk Lokasi"}
                mode="outlined"
                value={dataSementara._dataTiang[0].lokasi}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Deskripsi Temuan / Kondisi"}
                mode="outlined"
                value={dataSementara._dataTiang[0].kondisi}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Material"}
                mode="outlined"
                value={dataSementara._dataTiang[0].material}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Status Pemadaman"}
                mode="outlined"
                value={padamCheck(dataSementara._dataTiang[0].padam)}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Status Temuan"}
                mode="outlined"
                value={statusCheck(dataSementara._dataTiang[0].status)}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Status Pemadaman"}
                mode="outlined"
                value={dataSementara._dataTiang[0].tglsurvey}
                disabled={true}
              />
              <TextInput
                multiline={true}
                style={{ width: 300 }}
                label={"Tindakan"}
                mode="outlined"
                value={dataSementara._dataTiang[0].tindakan}
                disabled={true}
              />
            </View>
            {/* Tier ke I */}
            <>
              <View
                style={{
                  backgroundColor: "lightseagreen",
                  width: 300,
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: "white",
                    alignContent: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  TIER KE I
                </Text>
              </View>
              {/* Button Ke Bawah */}
              {/* SUTM */}
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"SUTM/SKUTM"}
                  value={dataSementara._dataTiang[0].tier11}
                ></TextInput>
              </View>
              {/* SKTM */}
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"SKTM"}
                  value={dataSementara._dataTiang[0].tier12}
                ></TextInput>
              </View>
              {/* Tiang */}
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"Tiang"}
                  value={dataSementara._dataTiang[0].tier13}
                ></TextInput>
              </View>
              {/* Trafo */}
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"Trafo"}
                  value={dataSementara._dataTiang[0].tier14}
                ></TextInput>
              </View>
            </>

            {/* Tier ke 2 */}
            <>
              <View
                style={{
                  backgroundColor: "purple",
                  width: 300,
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: "white",
                    alignContent: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  TIER KE II
                </Text>
              </View>
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"SUTM/SKUTM II"}
                  value={dataSementara._dataTiang[0].tier21}
                ></TextInput>
              </View>
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"SKTM II"}
                  value={dataSementara._dataTiang[0].tier22}
                ></TextInput>
              </View>
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"Tiang II"}
                  value={dataSementara._dataTiang[0].tier23}
                ></TextInput>
              </View>
              <View style={{ width: 300 }}>
                <TextInput
                  mode="outlined"
                  allowFontScaling={true}
                  multiline={true}
                  disabled={true}
                  label={"Trafo II"}
                  value={dataSementara._dataTiang[0].tier24}
                ></TextInput>
              </View>
            </>
            <View
              style={{
                backgroundColor: "mediumseagreen",
                width: 300,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  padding: 5,
                  color: "white",
                  alignContent: "center",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                AKSI LAPANGAN
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", width: 300 }}>
                Status Pemeliharaan
              </Text>
              <Picker
                selectedValue={stateInput._statusPemeliharaan}
                onValueChange={onValueChange.bind(this)}
              >
                <Picker.Item label="Pilih Salah Satu" value="---" />
                <Picker.Item label="Cukup / Baik" value="3" />
                <Picker.Item label="Kurang" value="1" />
                <Picker.Item label="Buruk" value="0" />
              </Picker>
            </View>
            <TextInput
              style={{ width: 300 }}
              label={"Tindakan Pemeliharaan"}
              mode="outlined"
              onChangeText={(value) =>
                onHandlinginput(value, "_tindakanPemeliharaan")
              }
            />

            <TextInput
              style={{ width: 300 }}
              label={"Material Pemeliharaan"}
              mode="outlined"
              onChangeText={(value) =>
                onHandlinginput(value, "_materialPemeliharaan")
              }
            />

            <View style={{ paddingTop: 10 }} />
            <Button
              icon="check"
              mode={"contained"}
              style={{ width: 300 }}
              onPress={() => {
                SimpanProses();
              }}
            >
              <Text>SImpan</Text>
            </Button>
            <View style={{ paddingTop: 10 }} />

            <Button
              icon="arrow-left"
              mode={"text"}
              onPress={() => {
                alertHideModalUtama();
              }}
            >
              <Text>Kembali</Text>
            </Button>
          </View>
        </View>
      </ScrollView>

      {/* CAMERA MODAL */}
      <Modal animationType="slide" visible={camModal}>
        <Camera
          flashMode={Camera.Constants.FlashMode.auto}
          style={{ flex: 1 }}
          type={type}
          ref={cameraRef}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          ></View>
        </Camera>
        <View style={{ flex: 0.25, backgroundColor: "black" }}>
          <View style={{ alignSelf: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon="arrow-left"
                color={"grey"}
                style={{ backgroundColor: "black" }}
                size={40}
                onPress={() => handleCam(false)}
              />
              <IconButton
                icon="camera"
                color={"red"}
                style={{ backgroundColor: "black" }}
                size={60}
                onPress={() => ambilGambar()}
              />
              <IconButton
                icon="format-rotate-90"
                color={"grey"}
                style={{ backgroundColor: "black" }}
                size={40}
                onPress={() =>
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  )
                }
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" visible={modalViewimage} transparent={true}>
        <View
          style={{
            margin: 20,
            marginTop: 60,
            paddingTop: 40,
            backgroundColor: "white",
            borderRadius: 5,
            borderWidth: 2,
            padding: 5,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {imageShow()}
            <Button
              icon="arrow-left"
              mode={"text"}
              onPress={() => {
                handleViewImg(!modalViewimage);
              }}
            >
              <Text>Kembali</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
  },
  modalView: {
    marginTop: 35,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PemeliharaanMapProses;
