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
import {
  Sktm,
  Sktm2,
  Sutm,
  Sutm2,
  Tiang,
  Tiang2,
  Trafo,
  Trafo2,
} from "../list/";
const InspeksiMapProses = ({ navigation }) => {
  const { data, setData } = useContext(DataContext);
  const [dataSementara, setDataSementara] = useState({
    _HarTiang: "",
    _HarJtm: "",
    _HarRayon: "",
    _HarIdTiang: "",
    _HarIdJtm: "",
  });
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uriCam, seturiCam] = useState(null);
  const [camModal, setcamModal] = useState(false);
  const [stateInput, setInput] = useState({
    _penunjukLokasi: "",
    _deskripsiTemuan: "",
    _status: "",
  });
  const [isLoading, setisLoading] = useState(true);
  const [modalAction, setmodalAction] = useState({
    _modalsutm: false,
    _modalSKTM: false,
    _modalTiang: false,
    _modalTrafo: false,
    _modalsutm2: false,
    _modalSKTM2: false,
    _modalTiang2: false,
    _modalTrafo2: false,
  });
  const [dataSelect, setDataSelect] = useState({
    sutm: [],
    sktm: [],
    tiang: [],
    trafo: [],
    sutm2: [],
    sktm2: [],
    tiang2: [],
    trafo2: [],
  });

  const onSelectionsChange = (value, string) => {
    setDataSelect((prevstate) => ({
      ...prevstate,
      [string]: value,
    }));
    console.log(dataSelect);
  };

  const handlingModalAct = (value, state) => {
    setmodalAction((prevstate) => ({
      ...prevstate,
      [state]: value,
    }));
    console.log(modalAction);
  };

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
      _status: value,
    }));
  };

  const handleCam = (value) => {
    setcamModal(value);
  };

  const cameraRef = useRef(null);
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
        <View>
          <IconButton
            icon="camera"
            color={"grey"}
            style={{ backgroundColor: "white", alignSelf: "center" }}
            size={70}
          />
          <Text
            style={{
              fontSize: 9,
              color: "grey",
            }}
          >
            Catatan: Tekan Icon Kamera untuk mengambil gambar lapangan.
          </Text>
        </View>
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

  const hasilInspeksi = {
    idTiang: dataSementara._HarIdTiang,
    namaTiang: dataSementara._HarTiang,
    namaJtm: dataSementara._HarJtm,
    namaRayon: dataSementara._HarRayon,
    idJTM: dataSementara._HarIdJtm,
    photo: uriCam,
    penunjukLokasi: stateInput._penunjukLokasi,
    temuanLapangan: stateInput._deskripsiTemuan,
    status: stateInput._status,
    sutm: dataSelect.sutm,
    sktm: dataSelect.sktm,
    trafo: dataSelect.trafo,
    sutm2: dataSelect.sutm2,
    sktm2: dataSelect.sktm2,
    tiang2: dataSelect.tiang2,
    tiang: dataSelect.tiang,
    trafo2: dataSelect.trafo2,
    status_uploader: false,
  };

  const MemorySaveLocal = async () => {
    const prevHasilInspeksi = await AsyncStorage.getItem("_HasilInspeksi");
    const prevData = JSON.parse(prevHasilInspeksi);
    prevData.push(hasilInspeksi);
    await AsyncStorage.setItem("_HasilInspeksi", JSON.stringify(prevData));
    console.log(prevData.map((_data) => _data.idTiang));
  };

  const SimpanProses = async () => {
    if (
      stateInput._deskripsiTemuan == "" ||
      stateInput._penunjukLokasi == "" ||
      stateInput._status == "0"
    ) {
      Alert.alert(
        "Peringatan",
        "Deskipsi Temuan, Penunjuk Lokasi atau Status Masih Kosong. Harap isi Terlebih Dahulu"
      );
    } else if (!uriCam) {
      Alert.alert("Peringatan", "Anda belum mengambil gambar");
    } else {
      MemorySaveLocal();

      data.global_HasilInspeksi.push(hasilInspeksi);
      console.log(data.global_HasilInspeksi);
      Alert.alert(
        "BERHASIL",
        "Data Inspeksi Berhasil di Proses.",
        [{ text: "OK", onPress: () => navigation.navigate("Inspeksi") }],
        { cancelable: false }
      );
    }
  };

  const loadData = async () => {
    const _HarTiang = await AsyncStorage.getItem("_dataInspeksi_Tiang");
    const _HarJtm = await AsyncStorage.getItem("_dataInspeksi_Jtm");
    const _HarRayon = await AsyncStorage.getItem("_dataInspeksi_Rayon");
    const _HarIdTiang = await AsyncStorage.getItem("_dataInspeksi_id_Tiang");
    const _HarIdJtm = await AsyncStorage.getItem("_dataInspeksi_id_Jtm");
    setDataSementara((prevstate) => ({
      ...prevstate,
      _HarTiang: _HarTiang,
      _HarJtm: _HarJtm,
      _HarRayon: _HarRayon,
      _HarIdTiang: _HarIdTiang,
      _HarIdJtm: _HarIdJtm,
    }));
    try {
      const prevHasilInspeksi = await AsyncStorage.getItem("_HasilInspeksi");
      if (
        prevHasilInspeksi == "Data Kosong" ||
        prevHasilInspeksi == null ||
        prevHasilInspeksi == ""
      ) {
        await AsyncStorage.setItem("_HasilInspeksi", "[]");
        setisLoading(false);
      } else {
        const prevData = JSON.parse(prevHasilInspeksi);
        if (prevData.some((_data) => _data.idTiang == _HarIdTiang)) {
          Alert.alert(
            "PERINGATAN",
            "Data ini sudah ada. Jika ingin Ada Perubahan pada Inspeksi ini, Anda Harus menghapus terlebih Dahulu Data yang ada di Memory.",
            [
              {
                text: "KEMBALI",
                onPress: () => navigation.navigate("Inspeksi"),
              },
              {
                text: "LIHAT DATA INSPEKSI",
                onPress: () => navigation.navigate("InspeksiHasil"),
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

  const hideModalUtama = async () => {
    await AsyncStorage.removeItem("_dataInspeksi_Tiang");
    await AsyncStorage.removeItem("_dataInspeksi_Jtm");
    await AsyncStorage.removeItem("_dataInspeksi_Rayon");
    await AsyncStorage.removeItem("_dataInspeksi_id_Tiang");
    await AsyncStorage.removeItem("_dataInspeksi_id_Jtm");
    navigation.navigate("Inspeksi");
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
    // checkData();
  }, []);

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

              <TouchableOpacity
                onPress={() => handleCam(true)}
                style={{ paddingBottom: 10 }}
              >
                {loadFoto()}
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                style={{ width: 300 }}
                label={"ID Tiang"}
                mode="outlined"
                value={dataSementara._HarIdTiang}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Nama Tiang"}
                mode="outlined"
                value={dataSementara._HarTiang}
                disabled={true}
              />
              <TextInput
                style={{ width: 300 }}
                label={"Penunjuk Lokasi"}
                mode="outlined"
                onChangeText={(value) =>
                  onHandlinginput(value, "_penunjukLokasi")
                }
              />
              <TextInput
                style={{ width: 300 }}
                label={"Deskripsi Temuan"}
                mode="outlined"
                onChangeText={(value) =>
                  onHandlinginput(value, "_deskripsiTemuan")
                }
              />
              <View style={{ paddingTop: 10 }} />
              <View
                style={{
                  backgroundColor: "grey",
                  paddingBottom: 3,
                }}
              />
              <View style={{ paddingTop: 10 }} />

              {/* Select Ke bawah */}
              {/* Status Temuan */}
              <View>
                <Text style={{ fontWeight: "bold" }}>Status Temuan</Text>
                <Picker
                  selectedValue={stateInput._status}
                  onValueChange={onValueChange.bind(this)}
                >
                  <Picker.Item label="Pilih Salah Satu" value="0" />
                  <Picker.Item label="Kurang" value="kurang" />
                  <Picker.Item label="Buruk" value="buruk" />
                </Picker>
              </View>
            </View>
            <View style={{ paddingTop: 10 }} />
            {/* Tier ke I */}
            <>
              <View
                style={{
                  backgroundColor: "purple",
                  width: 300,
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
                <Text style={{ fontWeight: "bold" }}>Data SUTM/SKUTM:</Text>

                <View
                  style={{
                    backgroundColor: "gainsboro",
                    borderColor: "grey",
                    borderWidth: 1,
                    borderRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder={"Pilih Data"}
                    allowFontScaling={true}
                    multiline={true}
                    disabled={true}
                  >
                    {dataSelect.sutm.map((value, i) => (
                      <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                        {value.label},{" "}
                      </Text>
                    ))}
                  </TextInput>
                  <Button
                    mode={"outlined"}
                    onPress={() => {
                      handlingModalAct(true, "_modalsutm");
                    }}
                  >
                    <Text>Cari Data</Text>
                  </Button>
                </View>
              </View>

              {/* SKTM */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data SKTM:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalSKTM");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.sktm.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalSKTM");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Tiang */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data Tiang:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalTiang");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.tiang.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalTiang");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Trafo */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data Trafo:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalTrafo");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.trafo.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalTrafo");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>
            </>
            <View style={{ paddingTop: 10 }} />

            {/* Tier ke 2 */}
            <>
              <View
                style={{
                  backgroundColor: "purple",
                  width: 300,
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

              {/* SUTM */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data SUTM/SKUTM II:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalsutm2");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.sutm2.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalsutm2");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>

              {/* SKTM */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data SKTM II:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalSKTM2");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.sktm2.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalSKTM2");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Tiang */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data Tiang II:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalTiang2");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.tiang2.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalTiang2");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Trafo */}
              <View style={{ width: 300 }}>
                <Text style={{ fontWeight: "bold" }}>Data Trafo II:</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlingModalAct(true, "_modalTrafo2");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gainsboro",
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  >
                    <TextInput
                      placeholder={"Pilih Data"}
                      allowFontScaling={true}
                      multiline={true}
                      disabled={true}
                    >
                      {dataSelect.trafo2.map((value, i) => (
                        <Text style={{ color: "grey", fontSize: 10 }} key={i}>
                          {value.label},{" "}
                        </Text>
                      ))}
                    </TextInput>
                    <Button
                      mode={"outlined"}
                      onPress={() => {
                        handlingModalAct(true, "_modalTrafo2");
                      }}
                    >
                      <Text>Cari Data</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>
            </>
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

      {/* Kumpulan Modal Modal */}
      <>
        <Modal
          animationType="slide"
          visible={modalAction._modalsutm}
          transparent={true}
        >
          <Sutm
            selectedItems={dataSelect.sutm}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalAction._modalSKTM}
          transparent={true}
        >
          <Sktm
            selectedItems={dataSelect.sktm}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalAction._modalTiang}
          transparent={true}
        >
          <Tiang
            selectedItems={dataSelect.tiang}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalAction._modalTrafo}
          transparent={true}
        >
          <Trafo
            selectedItems={dataSelect.trafo}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>
        {/*  */}
        <Modal
          animationType="slide"
          visible={modalAction._modalsutm2}
          transparent={true}
        >
          <Sutm2
            selectedItems={dataSelect.sutm2}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalAction._modalSKTM2}
          transparent={true}
        >
          <Sktm2
            selectedItems={dataSelect.sktm2}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalAction._modalTiang2}
          transparent={true}
        >
          <Tiang2
            selectedItems={dataSelect.tiang2}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalAction._modalTrafo2}
          transparent={true}
        >
          <Trafo2
            selectedItems={dataSelect.trafo2}
            onSelectionsChange={onSelectionsChange}
            handlingModalAct={handlingModalAct}
          />
        </Modal>
      </>

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
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
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

export default InspeksiMapProses;
