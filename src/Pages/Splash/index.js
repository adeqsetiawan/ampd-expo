import React, { useEffect } from "react";
import { StyleSheet, View, Image, AsyncStorage } from "react-native";
import { SplashImg } from "../../../assets";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.replace("InspeksiPages");
      // navigation.replace("Dashboard");
      // navigation.replace("CheckStatus");
      navigation.replace("Pemeliharaan");
    }, 2000);
  });

  return (
    <View
      style={{
        backgroundColor: "#ffed00",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={SplashImg}
        style={{
          width: 218,
          height: 283,
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "red",
  },
});
