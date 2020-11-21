// Yang Belum
//  - Upload Data
// Axios Ke Server

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
import { Button, Divider, FAB, TextInput } from "react-native-paper";
import Axios from "axios";

const ListData = () => {
  const [hasilPemeliharaanState, sethasilPemeliharaanState] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataModal, setdataModal] = useState({
    area: "",
    idjtm: "",
    idsurvey: "",
    idtiang: "",
    kdpemilik: "",
    kdpengelola: "",
    kode_wo: "",
    kondisi: "",
    koordinat_x: "",
    koordinat_y: "",
    lokasi: "",
    material: "",
    notiang: "",
    padam: "",
    penyulang: "",
    rayon: "",
    status: "",
    tglsurvey: "",
    tier11: "",
    tier12: "",
    tier13: "",
    tier14: "",
    tier21: "",
    tier22: "",
    tier23: "",
    tier24: "",
    tindakan: "",
    _statusPemeliharaan: "",
    _tindakanPemeliharaan: "",
    _materialPemeliharaan: "",
    status_uploader: "",
    photo: "",
  });

  const loadData = async () => {
    const prevHasilPemeliharaan = await AsyncStorage.getItem(
      "_HasilPemeliharaan"
    );
    if (prevHasilPemeliharaan == null) {
      return;
    }
    if (
      prevHasilPemeliharaan != "Data Kosong" ||
      prevHasilPemeliharaan != null
    ) {
      const prevData = JSON.parse(prevHasilPemeliharaan);
      sethasilPemeliharaanState(prevData);
      console.log(prevData);
    }
  };
  const hideDialog = () => setVisible(false);

  const actModal = (
    area,
    idjtm,
    idsurvey,
    idtiang,
    kdpemilik,
    kdpengelola,
    kode_wo,
    kondisi,
    koordinat_x,
    koordinat_y,
    lokasi,
    material,
    notiang,
    padam,
    penyulang,
    rayon,
    status,
    tglsurvey,
    tier11,
    tier12,
    tier13,
    tier14,
    tier21,
    tier22,
    tier23,
    tier24,
    tindakan,
    _statusPemeliharaan,
    _tindakanPemeliharaan,
    _materialPemeliharaan,
    status_uploader,
    photo
  ) => {
    setdataModal({
      area: area,
      idjtm: idjtm,
      idsurvey: idsurvey,
      idtiang: idtiang,
      kdpemilik: kdpemilik,
      kdpengelola: kdpengelola,
      kode_wo: kode_wo,
      kondisi: kondisi,
      koordinat_x: koordinat_x,
      koordinat_y: koordinat_y,
      lokasi: lokasi,
      material: material,
      notiang: notiang,
      padam: padam,
      penyulang: penyulang,
      rayon: rayon,
      status: status,
      tglsurvey: tglsurvey,
      tier11: tier11,
      tier12: tier12,
      tier13: tier13,
      tier14: tier14,
      tier21: tier21,
      tier22: tier22,
      tier23: tier23,
      tier24: tier24,
      tindakan: tindakan,
      _statusPemeliharaan: _statusPemeliharaan,
      _tindakanPemeliharaan: _tindakanPemeliharaan,
      _materialPemeliharaan: _materialPemeliharaan,
      status_uploader: status_uploader,
      photo: photo,
    });
    setVisible(true);
  };

  const prosesHapus = async (idTiang) => {
    try {
      const newState = hasilPemeliharaanState.filter(
        (row) => row.idsurvey !== idTiang
      );
      sethasilPemeliharaanState(newState);
      await AsyncStorage.setItem(
        "_HasilPemeliharaan",
        JSON.stringify(newState)
      );
      Alert.alert("Berhasil", "Anda berhasil menghapus data...");
      setVisible(false);
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
      // const dataPemeliharaan = new FormData();
      // dataPemeliharaan.append("username", state.username);
      // dataPemeliharaan.append("password", state.password);
      // dataPemeliharaan.append("telepon", state.nomorTelepon);
      // dataPemeliharaan.append("namaLengkap", state.namaLengkap);
      // dataPemeliharaan.append("unit", state.unit);
      // const { data } = await Axios.post(
      //   "https://amadis.api.dev-fux.xyz/register",
      //   dataPemeliharaan
      // );
      // console.log(data);

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
    if (hasilPemeliharaanState != null || hasilPemeliharaanState != "") {
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {hasilPemeliharaanState.map((val, key) => (
          <View key={key} style={{ margin: 10 }}>
            <TouchableOpacity
              key={key}
              onPress={() => {
                actModal(
                  val.area,
                  val.idjtm,
                  val.idsurvey,
                  val.idtiang,
                  val.kdpemilik,
                  val.kdpengelola,
                  val.kode_wo,
                  val.kondisi,
                  val.koordinat_x,
                  val.koordinat_y,
                  val.lokasi,
                  val.material,
                  val.notiang,
                  val.padam,
                  val.penyulang,
                  val.rayon,
                  val.status,
                  val.tglsurvey,
                  val.tier11,
                  val.tier12,
                  val.tier13,
                  val.tier14,
                  val.tier21,
                  val.tier22,
                  val.tier23,
                  val.tier24,
                  val.tindakan,
                  val._statusPemeliharaan,
                  val._tindakanPemeliharaan,
                  val._materialPemeliharaan,
                  val.status_uploader,
                  val.photo
                );
              }}
            >
              <View
                style={{
                  paddingBottom: 5,
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
                  <Text style={{ fontWeight: "bold" }}> {val.notiang}</Text>
                  <Text style={{ fontSize: 11 }}>
                    Penyulang:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {" "}
                      {val.penyulang}{" "}
                    </Text>
                    <Text>
                      Rayon:{" "}
                      <Text style={{ fontWeight: "bold" }}> {val.rayon} </Text>
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 11 }}>
                    Lokasi:{" "}
                    <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                      {val.lokasi}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 11 }}>
                    Kondisi:{" "}
                    <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                      {val.kondisi}
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
        {buttonRefresh()}
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
                  RINCIAN DATA PEMELIHARAAN
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
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "steelblue",
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
                    DATA TIANG
                  </Text>
                </View>

                <TextInput
                  mode="outlined"
                  label={"Nama Tiang"}
                  value={dataModal.notiang}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Penyulang"}
                  value={dataModal.penyulang}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Rayon"}
                  value={dataModal.rayon}
                  disabled={true}
                  multiline={true}
                />

                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "salmon",
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
                    DATA PEMELIHARAAN
                  </Text>
                </View>

                <TextInput
                  mode="outlined"
                  label={"Lokasi"}
                  value={dataModal.lokasi}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Kondisi"}
                  value={dataModal.kondisi}
                  disabled={true}
                  multiline={true}
                />

                <TextInput
                  mode="outlined"
                  label={"Status"}
                  value={statusCheck(dataModal.status)}
                  disabled={true}
                  multiline={true}
                />

                <TextInput
                  mode="outlined"
                  label={"Tindakan"}
                  value={dataModal.tindakan}
                  disabled={true}
                  multiline={true}
                />

                <TextInput
                  mode="outlined"
                  label={"Material"}
                  value={dataModal.material}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Pemadaman"}
                  value={padamCheck(dataModal.padam)}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Survey"}
                  value={dataModal.tglsurvey}
                  disabled={true}
                  multiline={true}
                />

                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "mediumseagreen",
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

                <TextInput
                  mode="outlined"
                  label={"SUTM/SKUTM"}
                  value={dataModal.tier11}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"SKTM"}
                  value={dataModal.tier12}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Tiang"}
                  value={dataModal.tier13}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Trafo"}
                  value={dataModal.tier14}
                  disabled={true}
                  multiline={true}
                />

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
                <TextInput
                  mode="outlined"
                  label={"SUTM/SKUTM"}
                  value={dataModal.tier21}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"SKTM"}
                  value={dataModal.tier22}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Tiang"}
                  value={dataModal.tier23}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Trafo"}
                  value={dataModal.tier24}
                  disabled={true}
                  multiline={true}
                />

                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "goldenrod",
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
                    AKSI LAPANGAN
                  </Text>
                </View>
                <TextInput
                  mode="outlined"
                  label={"Tindakan Pemeliharaan"}
                  value={dataModal._tindakanPemeliharaan}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Material Pemeliharaan"}
                  value={dataModal._materialPemeliharaan}
                  disabled={true}
                  multiline={true}
                />
                <TextInput
                  mode="outlined"
                  label={"Status Pemeliharaan"}
                  value={statusCheck(dataModal._statusPemeliharaan)}
                  disabled={true}
                  multiline={true}
                />

                <View style={{ margin: 20 }}>
                  <View>
                    <Button
                      style={{ backgroundColor: "maroon" }}
                      mode="contained"
                      onPress={() =>
                        hapusData(1, dataModal.idsurvey, dataModal.notiang)
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
