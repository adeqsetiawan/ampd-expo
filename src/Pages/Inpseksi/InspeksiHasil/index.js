import React from "react";
import { Appbar } from "react-native-paper";
import ListData from "./ListData";
import Uploader from "../Uploader";

const InspeksiHasil = ({ navigation }) => {
  const navigations = (value) => {
    navigation.navigate(value);
  };
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: "#444444",
        }}
      >
        <Appbar.BackAction onPress={() => navigation.navigate("Inspeksi")} />
        <Appbar.Content title="Data Inspeksi" subtitle="Pengelolaan Inspeksi" />
        <Uploader />
      </Appbar.Header>
      <ListData />
    </>
  );
};
export default InspeksiHasil;
