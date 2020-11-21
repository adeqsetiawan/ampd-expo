import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const Wavess = () => {
  const windowWidht = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const waves = (color, opacity, path) => {
    return (
      <View
        style={{
          height: 130,
          position: "absolute",
          width: windowWidht,
          zIndex: 1,
        }}
      >
        <Svg viewBox="0 0 1440 320">
          <Path fill={color} opacity={opacity} d={path} />
        </Svg>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          width: windowWidht,
          backgroundColor: "#fea500",
          paddingTop: 25,
        }}
      />
      <View
        style={{
          paddingLeft: 20,
          zIndex: 2,
          position: "absolute",
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            fontFamily: "Poppins",
          }}
        >
          AMPD
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Aplikasi Management Pengelolaan Distribusi
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "white",
            fontWeight: "bold",
          }}
        ></Text>
      </View>
      {waves(
        "darkorange",
        0.5,
        "M0,320L80,288C160,256,320,192,480,181.3C640,171,800,213,960,224C1120,235,1280,213,1360,202.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      )}
      {waves(
        "tomato",
        0.3,
        "M0,288L80,277.3C160,267,320,245,480,224C640,203,800,181,960,192C1120,203,1280,245,1360,266.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      )}

      {waves(
        "darkorange",
        0.7,
        "M0,224L80,186.7C160,149,320,75,480,64C640,53,800,107,960,144C1120,181,1280,203,1360,213.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      )}
      {waves(
        "darkorange",
        0.6,
        "M0,96L80,117.3C160,139,320,181,480,181.3C640,181,800,139,960,133.3C1120,128,1280,160,1360,176L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      )}
      {waves(
        "#fea500",
        0.6,
        "M0,224L80,197.3C160,171,320,117,480,85.3C640,53,800,43,960,42.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      )}
      {waves(
        "#fea500",
        0.2,
        "M0,224L80,213.3C160,203,320,181,480,149.3C640,117,800,75,960,53.3C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      )}

      <View style={{ paddingTop: 23 }} />
    </View>
  );
};

export default Wavess;
