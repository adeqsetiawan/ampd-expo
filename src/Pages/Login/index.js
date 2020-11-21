import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  Input,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Banner, IconApp } from "../../../assets";
import axios from "axios";
import { Button, TextInput } from "react-native-paper";
import Axios from "axios";

const Login = ({ navigation }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    token: "",
    isLoading: false,
  });

  const resetLogin = async () => {
    try {
      await AsyncStorage.setItem("login_username", "");
      await AsyncStorage.setItem("login_password", "");
      await AsyncStorage.setItem("login_token", "");
    } catch (error) {
      console.log(error);
    }
  };

  const HandlingInput = (value, state) => {
    setState((prevstate) => ({
      ...prevstate,
      [state]: value,
    }));
  };

  const SaveData = async () => {
    await AsyncStorage.setItem("login_username", state.username);
    await AsyncStorage.setItem("login_password", state.password);
    await AsyncStorage.setItem("login_token", state.token);
    await AsyncStorage.setItem("login_hakAkses", "administrator");
  };
  const loading = (value) => {
    setState((prevstate) => ({
      ...prevstate,
      isLoading: value,
    }));
  };
  const ActionLogin = async () => {
    loading(true);
    try {
      if (!state.username) {
        Alert.alert("Error", "Username Masih Kosong");
        loading(false);
      } else if (!state.password) {
        Alert.alert("Error", "Password Masih Kosong");
        loading(false);
      } else {
        const formData = new FormData();
        formData.append("username", state.username);
        formData.append("password", state.password);

        const { data } = await axios.post(
          "https://amadis.api.dev-fux.xyz/login",
          formData
        );
        console.log(data);

        if (!data.token) {
          Alert.alert("Error", data.message);
          loading(false);
        } else {
          console.log(data.token);
          SaveData();
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Dashboard" }],
            });
            loading(false);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
      loading(false);
    }
  };

  useEffect(() => {
    resetLogin();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={Banner}
            style={{
              padding: 10,
              width: 410,
              height: 150,
              borderRadius: 10,
            }}
          />
          <View style={{ marginTop: 190 }}></View>

          <View
            style={{
              marginHorizontal: 18,
              backgroundColor: "white",
              position: "absolute",
              marginTop: 120,
              width: 385,
              height: 582,
              borderTopLeftRadius: 45,
              borderTopRightRadius: 45,
              borderBottomRightRadius: 45,
            }}
          ></View>
        </View>

        <Text
          style={{
            fontSize: 45,
            fontFamily: "Roboto",
            position: "absolute",
            marginTop: 130,
            marginLeft: 40,
          }}
        >
          AMPD
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Roboto",
            position: "absolute",
            marginTop: 185,
            marginLeft: 40,
            color: "grey",
          }}
        >
          Aplikasi Management Pengelolaan Distribusi
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Roboto",
            position: "absolute",
            marginTop: 199,
            marginLeft: 40,
            color: "grey",
          }}
        >
          Powered By AMADIS
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontFamily: "Roboto",
            position: "absolute",
            marginTop: 315,
            marginLeft: 40,
            color: "grey",
          }}
        >
          Silahkan Login untuk melanjutkan...
        </Text>

        <Image
          source={IconApp}
          style={{
            marginLeft: 270,
            marginTop: 130,
            width: 120,
            height: 120,
            position: "absolute",
            borderColor: "white",
            borderWidth: 4,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        />
        <View style={{ marginLeft: 40, marginRight: 20 }}>
          <TextInput
            mode="outlined"
            value={state.username}
            autoCapitalize="none"
            label="Username"
            onChangeText={(value) => HandlingInput(value, "username")}
          />
          <View style={{ padding: 5 }} />
          <TextInput
            secureTextEntry={true}
            autoCapitalize="none"
            mode="outlined"
            value={state.password}
            label="Password"
            onChangeText={(value) => HandlingInput(value, "password")}
          />
        </View>
        <View style={{ marginLeft: 40, marginRight: 20, paddingTop: 20 }}>
          <Button icon="login" mode="contained" onPress={() => ActionLogin()}>
            Login
          </Button>
        </View>
        <View
          style={{
            marginLeft: 40,
            marginRight: 20,
            paddingTop: 50,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 9,
            }}
          >
            Tidak Bisa Login / Belum Punya Akun?
          </Text>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  color: "teal",
                  fontSize: 10,
                }}
              >
                REGISTRASI
              </Text>
              <ActivityIndicator
                animating={state.isLoading}
                style={{ paddingTop: 10 }}
                size="large"
                color="#0000ff"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            marginLeft: 40,
            marginRight: 20,
            marginTop: 100,
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

export default Login;
