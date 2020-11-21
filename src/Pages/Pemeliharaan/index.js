import { isLoaded } from "expo-font";
import React, { useEffect, useState } from "react";
import { AsyncStorage, View } from "react-native";
import { Appbar } from "react-native-paper";
import DownloadTO from "./PemeliharaanDownloadTO";
import PemeliharaanMap from "./PemeliharaanMap";

const Pemeliharaan = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(true);

  const HandleisLoading = (value) => {
    setisLoading(value);
  };
  const navigations = (value) => {
    navigation.navigate(value);
  };

  const checkData = async () => {
    const prevData = await AsyncStorage.getItem("_HasilPemeliharaan");
    const prevData2 = await AsyncStorage.getItem("Pemeliharaan_tiang");
    if (prevData == null || prevData == "") {
      await AsyncStorage.setItem("_HasilPemeliharaan", "Data Kosong");
      console.log(prevData);
    }
    if (prevData2 == null || prevData2 == "") {
      await AsyncStorage.setItem("Pemeliharaan_tiang", "Data Kosong");
      console.log(prevData);
    }
  };

  useEffect(() => {
    console.log(isLoading);
    checkData();
  }, [isLoading]);

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: "#444444",
        }}
      >
        <Appbar.BackAction onPress={() => navigation.navigate("Dashboard")} />
        <Appbar.Content
          title="Pemeliharaan"
          subtitle="Pengelolaan Pemeliharaan"
        />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <DownloadTO HandleisLoading={HandleisLoading} />
      <PemeliharaanMap
        HandleisLoading={HandleisLoading}
        navigations={navigations}
      />
    </>
  );
};
export default Pemeliharaan;
