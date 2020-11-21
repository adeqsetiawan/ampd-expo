import { isLoaded } from "expo-font";
import React, { useEffect, useState } from "react";
import { AsyncStorage, View } from "react-native";
import { Appbar } from "react-native-paper";
import DownloadTO from "./InspeksiDownloadTO";
import InspeksiMap from "./InspeksiMap";

const Inspeksi = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(true);

  const HandleisLoading = (value) => {
    setisLoading(value);
  };
  const navigations = (value) => {
    navigation.navigate(value);
  };

  const checkData = async () => {
    const prevData = await AsyncStorage.getItem("_HasilInspeksi");
    const prevData2 = await AsyncStorage.getItem("Inspeksi_tiang");
    if (prevData == null || prevData == "") {
      await AsyncStorage.setItem("_HasilInspeksi", "Data Kosong");
      console.log(prevData);
    }
    if (prevData2 == null || prevData2 == "") {
      await AsyncStorage.setItem("Inspeksi_tiang", "Data Kosong");
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
        <Appbar.Content title="Inspeksi" subtitle="Pengelolaan Inspeksi" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <DownloadTO HandleisLoading={HandleisLoading} />
      <InspeksiMap
        HandleisLoading={HandleisLoading}
        navigations={navigations}
      />
    </>
  );
};
export default Inspeksi;
