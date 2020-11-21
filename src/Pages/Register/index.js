import Axios from "axios";
import React, { useState } from "react";
import { Alert, Image, StatusBar, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { BannerRegister, IconAppText, LogoApp, Siger } from "../../../assets";

const Register = ({ navigation }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    verify_password: "",
    namaLengkap: "",
    nomorTelepon: "",
    unit: "Unit",
  });
  const HandlingRegister = (state, value) => {
    setState((prevstate) => ({
      ...prevstate,
      [state]: value,
    }));
  };
  const ActionRegister = async () => {
    console.log(state);
    if (!state.username) {
      Alert.alert("Error", "Username Kosong");
    } else if (!state.password) {
      Alert.alert("Error", "Password Kosong");
    } else if (state.password !== state.verify_password) {
      Alert.alert("Error", "Password Tidak Sama");
    } else if (!state.namaLengkap) {
      Alert.alert("Error", "Nama Lengkap Kosong");
    } else if (!state.nomorTelepon) {
      Alert.alert("Error", "Nomor Telepon Kosong");
    } else {
      try {
        const formData = new FormData();
        formData.append("username", state.username);
        formData.append("password", state.password);
        formData.append("telepon", state.nomorTelepon);
        formData.append("namaLengkap", state.namaLengkap);
        formData.append("unit", state.unit);

        const { data } = await Axios.post(
          "https://amadis.api.dev-fux.xyz/register",
          formData
        );
        console.log(data.message);
        console.log(data);

        Alert.alert("Berhasil", data.message);

        navigation.navigate("Login");
      } catch (err) {
        console.log(err);
        Alert.alert("Gagal", err.response.data.message);
      }
    }
  };
  const BackButton = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={{}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={BannerRegister}
            style={{
              position: "absolute",
              width: 410,
              height: 553,
              borderBottomLeftRadius: 200,
              borderTopRightRadius: 400,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            marginTop: 83,
            width: 340,
            height: 590,
            borderTopLeftRadius: 125,
            borderBottomRightRadius: 50,
            marginLeft: 35,
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            marginTop: 60,
            marginLeft: 320,
          }}
        >
          <Image
            source={LogoApp}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "grey",
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: 150,
            marginLeft: 70,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            REGISTRASI
          </Text>
          <Text
            style={{
              fontSize: 10,
            }}
          >
            Daftarkan Devices Anda untuk Login di AMPD.
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: 10,
            marginLeft: 166,
          }}
        >
          <Image
            source={IconAppText}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
            }}
          />
        </View>

        <View style={{ marginTop: 200, marginLeft: 50, marginRight: 50 }}>
          <TextInput
            mode="outlined"
            value={state.username}
            autoCapitalize="none"
            label="Username"
            onChangeText={(value) => HandlingRegister("username", value)}
          />
          <TextInput
            style={{ paddingTop: 10 }}
            mode="outlined"
            value={state.password}
            secureTextEntry={true}
            autoCapitalize="none"
            label="Password"
            onChangeText={(value) => HandlingRegister("password", value)}
          />
          <TextInput
            style={{ paddingTop: 10 }}
            mode="outlined"
            value={state.verify_password}
            secureTextEntry={true}
            autoCapitalize="none"
            label="Verifikasi Password"
            onChangeText={(value) => HandlingRegister("verify_password", value)}
          />
          <TextInput
            style={{ paddingTop: 10 }}
            mode="outlined"
            value={state.namaLengkap}
            autoCapitalize="none"
            label="Nama Lengkap"
            onChangeText={(value) => HandlingRegister("namaLengkap", value)}
          />
          <TextInput
            style={{ paddingTop: 10 }}
            mode="outlined"
            value={state.nomorTelepon}
            keyboardType={"numeric"}
            numeric
            autoCapitalize="none"
            label="Nomor Telepon"
            onChangeText={(value) => HandlingRegister("nomorTelepon", value)}
          />
        </View>
        <View style={{ marginLeft: 50, marginRight: 50, paddingTop: 20 }}>
          <Button
            icon="login"
            mode="contained"
            onPress={() => ActionRegister()}
          >
            DAFTAR
          </Button>
          <Button
            style={{ padding: 10 }}
            icon="arrow-left"
            onPress={() => BackButton()}
          >
            Kembali
          </Button>
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: 700,
            alignSelf: "center",
          }}
        >
          <Image
            source={Siger}
            style={{
              width: 120,
              height: 60,
            }}
          />
        </View>

        <Text
          style={{
            marginLeft: 40,
            marginRight: 20,
            marginTop: 90,
            alignSelf: "center",
            color: "grey",
            fontSize: 10,
          }}
        >
          Version 1.0.0 REV - PLN Dist. Lampung
        </Text>
      </ScrollView>
    </View>
  );
};
export default Register;
