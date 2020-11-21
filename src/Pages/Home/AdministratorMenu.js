import React, { Component, useEffect } from "react";
import { AsyncStorage, Text, View } from "react-native";
import { userManager, validasi, createTO, createWO } from "../../../assets";

const AdministratorMenu = (props) => {
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
            onPress={() => props.HandleGoto(goto)}
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

  const CheckUser = async () => {
    const jenisUser = await AsyncStorage.getItem("login_hakAkses");
    if (jenisUser !== "administrator") {
      return <View />;
    } else {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            {menu(
              "UserManager",
              userManager,
              "User Manager",
              "snow",
              "#FFF",
              "#FFF",
              "rgba(230, 126, 34,0.1)"
            )}
            {menu(
              "CreateTO",
              createTO,
              "Target Operasi",
              "mintcream",
              "#FFF",
              "#FFF",
              "rgba(39, 174, 96,0.1)"
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            {menu(
              "CreateWO",
              createWO,
              "Work Order",
              "snow",
              "#FFF",
              "#FFF",
              "rgba(230, 126, 34,0.1)"
            )}
            {menu(
              "Validasi",
              validasi,
              "Validasi",
              "mintcream",
              "#FFF",
              "#FFF",
              "rgba(39, 174, 96,0.1)"
            )}
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);
  return <Text>MenuAdministraotor</Text>;
};
export default AdministratorMenu;
