import React from "react";
import { Alert, Text, View } from "react-native";
import { Appbar } from "react-native-paper";

const Uploader = (props) => {
  const test = () => {
    Alert.alert("test");
  };

  return (
    <>
      <View>
        <Appbar.Action
          style={{ backgroundColor: "white" }}
          icon="cloud-upload"
          onPress={() => test()}
        />
      </View>
    </>
  );
};
export default Uploader;
