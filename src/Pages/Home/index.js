import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Button, IconButton, TouchableRipple } from "react-native-paper";
import {
  iconinspeksi2,
  iconPemeliharaan2,
  iconMonitoring2,
  iconWdAset2,
  validasi,
} from "../../../assets";
import Wavess from "./wavess";
import AdministratorMenu from "./AdministratorMenu";

const Home = ({ navigation }) => {
  const [state, setState] = useState({
    images: [
      require("../../../assets/slider/1.png"), // Local image
      require("../../../assets/slider/2.png"), // Local image
    ],
    nama_area: "data kosong",
    nama_rayon: "data kosong",
    nama_jtm: "data kosong",
  });

  const HandleGoto = (value) => {
    navigation.navigate(value);
  };

  const HandlingData = async () => {
    try {
      const Area = await AsyncStorage.getItem("Namaarea");
      const Rayon = await AsyncStorage.getItem("Namarayon");
      const Jtm = await AsyncStorage.getItem("Namajtm");
      const hasilArea = await JSON.parse(Area);
      const hasilRayon = await JSON.parse(Rayon);
      const hasilJtm = await JSON.parse(Jtm);

      if (!hasilJtm) {
        navigation.navigate("Account");
        Alert.alert(
          "Perhatian",
          "Data Tiang Wajib di Tentukan di Awal Aplikasi Berjalan"
        );
      } else
        setState((prefState) => ({
          ...prefState,
          nama_area: hasilArea,
          nama_rayon: hasilRayon,
          nama_jtm: hasilJtm,
        }));
      console.log(hasilJtm);
    } catch (err) {
      console.log(err);
    }
  };

  const informasiDashboard = (nama, states, color, icon) => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: color,
              width: 120,
              borderRadius: 3,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <IconButton icon={icon} color="white" size={20} />

              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    paddingTop: 10,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 7,
                  }}
                >
                  {states}
                </Text>
                <Text style={{ fontSize: 10, color: "floralwhite" }}>
                  {nama}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const menu = (
    goto,
    image,
    name,
    gradient1,
    gradient2,
    gradient3,
    shadowcol
  ) => {
    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: -1,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.2,

          elevation: 3,
        }}
      >
        <LinearGradient
          colors={[gradient1, gradient2, gradient3]}
          style={{
            alignContent: "center",
            width: 180,
            height: 150,
            backgroundColor: "white",
            borderRadius: 10,
            margin: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(goto)}
            rippleColor="rgba(0, 0, 0, 0.07)"
            style={{
              borderRadius: 16,
            }}
          >
            <View
              style={{
                paddingTop: 20,
              }}
            >
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  position: "absolute",
                  backgroundColor: shadowcol,
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                }}
              />
              <Image
                source={image}
                style={{ width: 50, height: 50, marginLeft: 30 }}
              />
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  width: 150,
                  borderRadius: 14,
                  height: 60,
                  backgroundColor: "#F7F8FA",
                }}
              >
                <Text
                  style={{
                    marginTop: 16,
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingLeft: 10,
                    color: "#707070",
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    paddingLeft: 10,
                    color: "#707070",
                  }}
                >
                  Pengelolaan Data {name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  useEffect(() => {
    HandlingData();
  }, [state.nama_jtm]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const [refreshing, setRefreshing] = useState(false);

  const actionRefresh = () => {
    setRefreshing(false);
    HandlingData();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => actionRefresh());
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Wavess />
          <View style={{ backgroundColor: "#F7F8FA" }}>
            <View style={{ borderRadius: 25 }}>
              <SliderBox
                images={state.images}
                autoplay={true}
                circleLoop={true}
                dotColor="orange"
                inactiveDotColor="tomato"
              />
            </View>

            <View style={{ paddingTop: 10 }} />
            <View
              style={{
                alignSelf: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {menu(
                  "Inspeksi",
                  iconinspeksi2,
                  "Inspeksi",
                  "snow",
                  "#FFF",
                  "#FFF",
                  "rgba(230, 126, 34,0.1)"
                )}
                {menu(
                  "WDAset",
                  iconWdAset2,
                  "WDAset",
                  "mintcream",
                  "#FFF",
                  "#FFF",
                  "rgba(39, 174, 96,0.1)"
                )}
              </View>
              <View style={{ paddingTop: 5 }} />

              <View style={{ flexDirection: "row" }}>
                {menu(
                  "Pemeliharaan",
                  iconPemeliharaan2,
                  "Pemeliharaan",
                  "ghostwhite",
                  "#FFF",
                  "#FFF",
                  "rgba(41, 128, 185,0.1)"
                )}
                {menu(
                  "Monitoring",
                  iconMonitoring2,
                  "Monitoring",
                  "snow",
                  "#FFF",
                  "#FFF",
                  "rgba(253, 121, 168,0.1)"
                )}
              </View>
              <View style={{ paddingTop: 5 }} />

              <View style={{ flexDirection: "row" }}>
                {menu(
                  "Pemeliharaan",
                  validasi,
                  "Gardu",
                  "lavenderblush",
                  "#FFF",
                  "#FFF",
                  "rgba(238, 92, 92, 0.1)"
                )}
                {/* {menu(
                  "Monitoring",
                  iconMonitoring2,
                  "Monitoring",
                  "snow",
                  "#FFF",
                  "#FFF",
                  "rgba(253, 121, 168,0.1)"
                )} */}
              </View>

              {/* <AdministratorMenu HandleGoto={HandleGoto} /> */}

              <View style={{ flexDirection: "row" }}></View>

              <View
                style={{
                  margin: 10,
                  flex: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    widht: 200,
                    height: 60,
                  }}
                >
                  <View style={{ paddingTop: 10 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    {informasiDashboard(
                      "AREA",
                      state.nama_area,
                      "darkseagreen",
                      "minus-box-outline"
                    )}
                    <View style={{ paddingLeft: 10 }} />

                    {informasiDashboard(
                      "RAYON",
                      state.nama_rayon,
                      "lightcoral",
                      "account"
                    )}
                    <View style={{ paddingLeft: 10 }} />

                    {informasiDashboard(
                      "JTM/TIANG",
                      state.nama_jtm,
                      "steelblue",
                      "home"
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Home;
