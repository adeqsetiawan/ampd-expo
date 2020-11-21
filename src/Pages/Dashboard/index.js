import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useState } from "react";
import { Image, View, StatusBar } from "react-native";
import { Appbar, Button, Modal, Text, TextInput } from "react-native-paper";
import { Account } from "..";
import { IconApp } from "../../../assets";
import Home from "../Home";
import Notifikasi from "../Notifikasi";

const Tab = createMaterialBottomTabNavigator();

const Dashboard = ({ navigation }) => {
  const [visible, setvisible] = useState(false);

  const modalInfo = () => {
    setvisible(!visible);
  };
  return (
    <>
      <Tab.Navigator
        activeColor="orange"
        inactiveColor="black"
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: "home-city-outline",
            tabBarColor: "white",
          }}
        />
        <Tab.Screen
          name="Notifikasi"
          component={Notifikasi}
          options={{
            tabBarIcon: "bell-outline",
            tabBarColor: "white",
          }}
        />
        {/* 
        <Tab.Screen
          name="Monitoring"
          component={Monitoring}
          options={{
            tabBarIcon: "monitor-dashboard",
            tabBarColor: "white",
          }}
        /> */}
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: "account-alert-outline",
            tabBarColor: "white",
          }}
        />
      </Tab.Navigator>
      <Modal
        style={{ borderRadius: 30 }}
        visible={visible}
        onDismiss={() => modalInfo()}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 300,
            height: 500,
            alignSelf: "center",
          }}
        >
          <View style={{ margin: 10, alignSelf: "center" }}>
            <Image
              source={IconApp}
              style={{
                borderRadius: 20,
                width: 150,
                height: 150,
                borderWidth: 4,
                borderColor: "floralwhite",
              }}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              AMPD PLN DIST LAMPUNG BY AMADAIS
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={{ fontSize: 11, margin: 10 }}>
              Hay, Kamu saat ini sedang menggunakan Aplikasi AMPD. Aplikasi ini
              di distribusikan untuk Pegawai / Petugas PLN Distribusi Lampung.
              Aplikasi ini adalah Update dari Versi sebelumnya. Jika ada keluhan
              mengenai aplikasi ini, mohon segera laporan melalui formulir
              berikut ya...
            </Text>
            <TextInput
              label={"Saran dan Masukan"}
              mode="outlined"
              style={{ width: 200, margin: 10, alignSelf: "center" }}
            />
            <Button
              mode="contained"
              style={{ width: 200, margin: 10, alignSelf: "center" }}
            >
              <Text style={{ color: "white" }}>KIRIM MASUKAAN</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default Dashboard;
