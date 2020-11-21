// Yang Belum
//  - Hapus Data
//  - Upload Data
// Axios Ke Server
//  Server Respon True, Alert OK,

import React, { useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, FAB } from "react-native-paper";
import Axios from "axios";

const ListData = () => {
  const [hasilInspeksiState, sethasilInspeksiState] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataModal, setdataModal] = useState({
    idJTM: "",
    idTiang: "",
    namaJtm: "",
    namaRayon: "",
    namaTiang: "",
    penunjukLokasi: "",
    temuanLapangan: "",
    status: "",
    photo: "",
    sktm: [],
    sktm2: [],
    sutm: [],
    sutm2: [],
    tiang2: [],
    trafo: [],
    trafo2: [],
    tiang: [],
  });

  const loadData = async () => {
    const prevHasilInspeksi = await AsyncStorage.getItem("_HasilInspeksi");
    if (prevHasilInspeksi == null) {
      return;
    }
    if (prevHasilInspeksi != "Data Kosong" || prevHasilInspeksi != null) {
      const prevData = JSON.parse(prevHasilInspeksi);
      sethasilInspeksiState(prevData);
      console.log(prevData);
    }
  };
  const hideDialog = () => setVisible(false);

  const actModal = (
    idJTM,
    idTiang,
    namaJtm,
    namaRayon,
    namaTiang,
    penunjukLokasi,
    temuanLapangan,
    status,
    photo,
    sktm,
    sktm2,
    sutm,
    sutm2,
    tiang2,
    trafo,
    trafo2,
    tiang
  ) => {
    setdataModal({
      idJTM: idJTM,
      idTiang: idTiang,
      namaJtm: namaJtm,
      namaRayon: namaRayon,
      namaTiang: namaTiang,
      penunjukLokasi: penunjukLokasi,
      temuanLapangan: temuanLapangan,
      status: status,
      photo: photo,
      sktm: sktm,
      sktm2: sktm2,
      sutm: sutm,
      sutm2: sutm2,
      tiang2: tiang2,
      trafo: trafo,
      trafo2: trafo2,
      tiang: tiang,
    });
    setVisible(true);
  };

  const prosesHapus = async (idTiang) => {
    try {
      const newState = hasilInspeksiState.filter(
        (row) => row.idTiang !== idTiang
      );
      sethasilInspeksiState(newState);
      await AsyncStorage.setItem("_HasilInspeksi", JSON.stringify(newState));
      Alert.alert("Berhasil", "Anda berhasil menghapus data...");
      setVisible(!visible);
      buttonRefresh();
    } catch (err) {
      console.log(err);
    }
  };

  const hapusData = (key, idTiang, namaTiang) => {
    Alert.alert(
      "PERINGATAN...!",
      `Anda yakin ingin menghapus data dengan Nama Tiang: ${namaTiang}? Data yang sudah terhapus tidak dapat dikembalikan`,
      [
        {
          text: "TIDAK",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        {
          text: "YA HAPUS",
          onPress: () => prosesHapus(idTiang),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const statusUploader = (val) => {
    if (val == false) {
      return <Text style={{ color: "red" }}>Belum Upload</Text>;
    }
    return <Text style={{ color: "green" }}>Sudah Upload </Text>;
  };

  const prosesUpload = async () => {
    try {
      Alert.alert(
        "BERHASIL",
        "Seluruh Data yang belum terupload saat ini berhasil di Upload Ke Server."
      );
    } catch (err) {
      console.log(err);
      Alert.alert(
        "GAGAL UPLOAD",
        "Terdapat Kesalahan. Mohon Ulangi atau Coba beberapa saat lagi."
      );
    }
  };

  const uploadData = () => {
    Alert.alert(
      "Upload Data",
      "Anda Yakin Seluruh data sudah Benar? Data yang sudah Terupload Tidak Dapat di Batalkan.",
      [
        {
          text: "TIDAK",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        {
          text: "YA UPLOAD SEKARANG",
          onPress: () => prosesUpload(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const buttonRefresh = () => {
    if (hasilInspeksiState != null || hasilInspeksiState != "") {
      return (
        <View>
          <View style={{ marginTop: 15 }}>
            <Button
              onPress={() => uploadData()}
              icon="cloud-upload"
              mode="contained"
              style={{ margin: 10 }}
            >
              <Text>Upload</Text>
            </Button>
          </View>
          <View>
            <Button
              onPress={() => loadData()}
              icon="refresh"
              mode="text"
              style={{ margin: 10 }}
            >
              <Text>Refresh</Text>
            </Button>
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {hasilInspeksiState.map((val, key) => (
          <View key={key} style={{ margin: 20 }}>
            <TouchableOpacity
              key={key}
              onPress={() => {
                actModal(
                  val.idJTM,
                  val.idTiang,
                  val.namaJtm,
                  val.namaRayon,
                  val.namaTiang,
                  val.penunjukLokasi,
                  val.temuanLapangan,
                  val.status,
                  val.photo,
                  val.sktm,
                  val.sktm2,
                  val.sutm,
                  val.sutm2,
                  val.tiang2,
                  val.trafo,
                  val.trafo2,
                  val.tiang
                );
              }}
            >
              <View
                style={{
                  paddingBottom: 5,
                  paddingTop: 5,
                  paddingLeft: 5,
                  flexDirection: "row",
                }}
              >
                <View style={{ paddingRight: 5 }}>
                  <Image
                    source={{ uri: val.photo }}
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 10,
                      borderWidth: 3,
                      borderColor: "grey",
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}> {val.namaTiang}</Text>
                  <Text style={{ fontSize: 11 }}>
                    JTM/JTR:{" "}
                    <Text style={{ fontWeight: "bold" }}> {val.namaJtm} </Text>
                    <Text>
                      Rayon:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {" "}
                        {val.namaRayon}{" "}
                      </Text>
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 11 }}>
                    Status Uploader:{" "}
                    <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                      {statusUploader(val.status_uploader)}
                    </Text>
                  </Text>
                </View>
              </View>
              <Divider />
            </TouchableOpacity>
          </View>
        ))}
        {/* Button Upload */}

        {buttonRefresh()}
        {/* <View>
          <Button
            onPress={() => loadData()}
            icon="refresh"
            mode="text"
            style={{ margin: 10 }}
          >
            <Text>REFRESH DATA</Text>
          </Button>
        </View> */}

        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onDismiss={hideDialog}
        >
          <ScrollView>
            <View
              style={{
                margin: 30,
                backgroundColor: "white",
                borderRadius: 5,
                padding: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={{ alignSelf: "center", paddingTop: 10 }}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 14,
                    paddingBottom: 20,
                  }}
                >
                  RINCIAN DATA INSPEKSI
                </Text>

                <Image
                  source={{ uri: dataModal.photo }}
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "grey",
                  }}
                />
              </View>

              <View style={{ margin: 20 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Nama Tiang:{" "}
                  <Text style={{ fontWeight: "normal", color: "indigo" }}>
                    {dataModal.namaTiang}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                  Nama JTM:{" "}
                  <Text style={{ fontWeight: "normal", color: "indigo" }}>
                    {dataModal.namaJtm}
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold" }}>
                  Rayon:{" "}
                  <Text style={{ fontWeight: "normal", color: "indigo" }}>
                    {dataModal.namaRayon}
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold" }}>
                  Status Temuan:{" "}
                  <Text style={{ fontWeight: "normal", color: "indigo" }}>
                    {dataModal.status}
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold" }}>
                  Penunjuk Lokasi:{" "}
                  <Text style={{ fontWeight: "normal", color: "indigo" }}>
                    {dataModal.penunjukLokasi}
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold" }}>
                  Temuan Lapangan:{" "}
                  <Text style={{ fontWeight: "normal", color: "indigo" }}>
                    {dataModal.temuanLapangan}
                  </Text>
                </Text>

                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "purple",
                    width: 300,
                  }}
                >
                  <Text
                    style={{
                      padding: 5,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    TIER KE I
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  SUTM:{" "}
                  {dataModal.sutm.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  SKTM:{" "}
                  {dataModal.sktm.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  Tiang:{" "}
                  {dataModal.tiang.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>

                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  Trafo:{" "}
                  {dataModal.trafo.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>

                {/*  */}

                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "purple",
                    width: 300,
                  }}
                >
                  <Text
                    style={{
                      padding: 5,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    TIER KE II
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  SUTM:{" "}
                  {dataModal.sutm2.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  SKTM:{" "}
                  {dataModal.sktm2.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  Tiang:{" "}
                  {dataModal.tiang2.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>

                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                  Trafo:{" "}
                  {dataModal.trafo2.map((value, i) => (
                    <Text
                      style={{ fontWeight: "normal", color: "indigo" }}
                      key={i}
                    >
                      {value.label},{" "}
                    </Text>
                  ))}
                </Text>
                <View style={{ margin: 20 }}>
                  <View>
                    <Button
                      style={{ backgroundColor: "maroon" }}
                      mode="contained"
                      onPress={() =>
                        hapusData(1, dataModal.idTiang, dataModal.namaTiang)
                      }
                      icon="delete"
                    >
                      <Text>hapus</Text>
                    </Button>
                  </View>

                  <View>
                    <Button
                      mode="text"
                      onPress={() => hideDialog()}
                      icon="arrow-left"
                    >
                      <Text style={{ color: "grey" }}>KEMBALI</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    </>
  );
};
export default ListData;
