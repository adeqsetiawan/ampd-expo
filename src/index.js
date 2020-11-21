import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";

import {
  Account,
  Dashboard,

  // Inspeksi
  Inspeksi,
  InspeksiHasil,
  InspeksiMap,
  InspeksiMapProses,
  Login,

  // Pemeliharaan
  Pemeliharaan,
  PemeliharaanHasil,
  PemeliharaanMap,
  PemeliharaanMapProses,
  Register,
  Splash,
  Welcome,
} from "./Pages";

const Stack = createStackNavigator();

const Router = () => {
  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require("../assets/font/Roboto.ttf"),
      SansitaSwashed: require("../assets/font/SansitaSwashed.ttf"),
      Poppins: require("../assets/font/Poppins.ttf"),
    });
    console.log("ampd> Font Loaded------------------- ");
  };

  //Memory Local Saved
  const memoryCreated = async () => {};

  useEffect(() => {
    memoryCreated();
    loadFont();
  });

  return (
    <>
      <StatusBar backgroundColor="rgba(36,36,36,0.8)" translucent />
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />

        {/* Inspeksi */}
        <Stack.Screen
          name="Inspeksi"
          component={Inspeksi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InspeksiMap"
          component={InspeksiMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InspeksiMapProses"
          component={InspeksiMapProses}
          options={{ headerShown: false, headerTitle: "Inspeksi" }}
        />
        <Stack.Screen
          name="InspeksiHasil"
          component={InspeksiHasil}
          options={{ headerShown: false, headerTitle: "InspeksiHasil" }}
        />

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
          }}
          component={Register}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Pemeliharaan"
          component={Pemeliharaan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PemeliharaanHasil"
          component={PemeliharaanHasil}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PemeliharaanMapProses"
          component={PemeliharaanMapProses}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PemeliharaanMap"
          component={PemeliharaanMap}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Router;
