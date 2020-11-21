import React from "react";
import { Appbar } from "react-native-paper";
import ListData from "./ListData";
import Uploader from "../Uploader";

const PemeliharaanHasil = ({ navigation }) => {
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
        <Appbar.BackAction
          onPress={() => navigation.navigate("Pemeliharaan")}
        />
        <Appbar.Content
          title="Data Pemeliharaan"
          subtitle="Pengelolaan Pemeliharaan"
        />
        <Uploader />
      </Appbar.Header>
      <ListData />
    </>
  );
};
export default PemeliharaanHasil;
