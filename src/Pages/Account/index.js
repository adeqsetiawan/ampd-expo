import { Picker } from "@react-native-community/picker";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Caption } from "react-native-paper";
import { IconApp } from "../../../assets";
import { RestApi } from "../../api";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: "",
      rayon: "",
      jtm: "",
      nama_area: "",
      nama_rayon: "",
      nama_jtm: "",
      //State Memory
      get_area: [],
      get_rayon: [],
      get_jtm: [],
      _statusarea: true,
      _statusrayon: false,
      _statusjtm: false,
      isReady: false,
      dataMemory: false,
      disabled: true,
    };
  }

  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  componentDidMount = async () => {
    try {
      const { data } = await axios.get(RestApi.BASEURL + RestApi.CMD_GET_AREA);
      console.log("data area", data.Area);
      this.setState({
        get_area: data.Area,
        isReady: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  LogoutHandle = () => {
    Alert.alert(
      "Konfirmasi",
      "Anda yakin ingin Logout?",
      [
        {
          text: "Kembali",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK, Logout Sekarang",
          onPress: () => {
            this.logout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  pickerHandler = async ({
    value,
    currInput,
    nextInput,
    fetchOpt,
    targets,
  } = {}) => {
    try {
      if (Array.isArray(targets)) {
        for (const target of targets) {
          this.setState({
            [target]: "",
            ["get_" + target]: [],
            ["_status" + target]: false,
            ["nama_" + currInput]: "",
          });
        }
      }

      this.setState({
        [currInput]: value,
        ["nama_" + currInput]: this.state["get_" + currInput].filter(
          (data) => data.kode == value
        )[0].nama,
      });

      console.log(this.state);

      if (!fetchOpt) {
        return;
      } else if (!fetchOpt.api || !fetchOpt.datakey) {
        return;
      }

      if (this.state.isReady == false) {
        return (
          <View>
            <ActivityIndicator />
          </View>
        );
      }

      const { data } = await axios.get(
        RestApi.BASEURL + RestApi[fetchOpt.api] + "/" + value
      );

      // console.log("data " + nextInput, data[fetchOpt.datakey]);

      if (data[fetchOpt.datakey].length < 1) {
        return;
      }

      this.setState({
        ["get_" + nextInput]: data[fetchOpt.datakey],
        ["_status" + nextInput]: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  windowWidth = Dimensions.get("window").width;
  windowHeight = Dimensions.get("window").height;

  prosesSimpan = async () => {
    try {
      const { data } = await axios.get(
        RestApi.BASEURL +
          RestApi.CMD_GET_TIANGJTM +
          "/" +
          this.state.jtm +
          "/2.6/imei"
      );
      console.log(this.state.jtm);
      console.log(data.Tiang);
      await AsyncStorage.setItem("area", JSON.stringify(this.state.area));
      await AsyncStorage.setItem("rayon", JSON.stringify(this.state.rayon));
      await AsyncStorage.setItem("jtm", JSON.stringify(this.state.jtm));
      await AsyncStorage.setItem("tiang", JSON.stringify(data.Tiang));

      await AsyncStorage.setItem(
        "Namaarea",
        JSON.stringify(this.state.nama_area)
      );
      await AsyncStorage.setItem(
        "Namarayon",
        JSON.stringify(this.state.nama_rayon)
      );
      await AsyncStorage.setItem(
        "Namajtm",
        JSON.stringify(this.state.nama_jtm)
      );

      console.log(this.state.nama_rayon);
      console.log("data Tiang berhasil di Unduh.");
      this.props.navigation.navigate("Dashboard");
      Alert.alert("Berhasil", "Data Tiang Berhasil di Unduh.");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isReady == false) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View
            style={{
              backgroundColor: "tomato",
              position: "absolute",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              width: this.windowWidth,
              height: 350,
            }}
          >
            <View
              style={{
                position: "relative",
                flexDirection: "row-reverse",
                marginTop: 50,
              }}
            >
              <TouchableOpacity onPress={() => this.LogoutHandle()}>
                <Text style={{ color: "white", paddingRight: 20 }}>Logout</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={IconApp}
              style={{
                borderRadius: 100,
                width: 150,
                height: 150,
                borderWidth: 4,
                borderColor: "floralwhite",
                alignSelf: "center",
                marginTop: 30,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  paddingRight: 50,
                  color: "white",
                }}
              >
                Username: its.masterplan
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                }}
              >
                Previlage: Administrator
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                width: 350,
                height: 100,
                alignSelf: "center",
                marginTop: 300,
                borderRadius: 15,
                shadowColor: "black",
                shadowOpacity: 0.15,
                shadowOffset: {
                  width: -8,
                  height: 0,
                },
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 10,
                    fontSize: 35,
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  AMPD
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "grey",
                  }}
                >
                  Aplikasi Managemen Pengelolaan Distribusi
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              width: 350,
              marginTop: 420,
              borderRadius: 15,
              alignSelf: "center",
            }}
          >
            <View style={{ margin: 10 }}>
              <View>
                <Caption>UP3/ AREA: </Caption>
                <Picker
                  mode="dropdown"
                  enabled={this.state._statusarea}
                  selectedValue={this.state.area}
                  onValueChange={(value) =>
                    this.pickerHandler({
                      value,
                      currInput: "area",
                      nextInput: "rayon",
                      targets: ["rayon", "jtm"],
                      fetchOpt: {
                        api: "CMD_GET_RAYON",
                        datakey: "Rayon",
                      },
                    })
                  }
                >
                  <Picker.Item label="Pilih data anda..." value="" />
                  {this.state.get_area.map((dataArea, i) => (
                    <Picker.Item
                      key={i}
                      label={dataArea.nama}
                      value={dataArea.kode}
                    />
                  ))}
                </Picker>
              </View>
              <Caption>ULP / RAYON: </Caption>

              <Picker
                mode="dialog"
                enabled={this.state._statusrayon}
                selectedValue={this.state.rayon}
                onValueChange={(value) =>
                  this.pickerHandler({
                    value,
                    currInput: "rayon",
                    nextInput: "jtm",
                    targets: ["jtm"],
                    fetchOpt: {
                      api: "CMD_GET_JTM",
                      datakey: "Jtm",
                    },
                  })
                }
              >
                <Picker.Item label="Pilih data anda..." value="" />
                {this.state.get_rayon.map((dataArea, i) => (
                  <Picker.Item
                    key={i}
                    label={dataArea.nama}
                    value={dataArea.kode}
                  />
                ))}
              </Picker>
              <Caption>TIANG / JTM: </Caption>
              <Picker
                mode="dialog"
                enabled={this.state._statusjtm}
                selectedValue={this.state.jtm}
                onValueChange={(value) =>
                  this.pickerHandler({ value, currInput: "jtm" })
                }
              >
                <Picker.Item label="Pilih data anda..." value="" />
                {this.state.get_jtm.map((dataArea, i) => (
                  <Picker.Item
                    key={i}
                    label={dataArea.nama}
                    value={dataArea.kode}
                  />
                ))}
              </Picker>

              <View style={{ paddingBottom: 15 }}></View>
              <Button
                // disabled={this.state.disabled}
                mode="contained"
                onPress={() => this.prosesSimpan()}
              >
                download data
              </Button>
            </View>
          </View>
        </>
      </ScrollView>
    );
  }
}
