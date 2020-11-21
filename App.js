import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Router from "./src";
import DataProvider from "./src/Context/DataProvider";
export default function App() {
  return (
    <NavigationContainer>
      <DataProvider>
        <Router />
      </DataProvider>
    </NavigationContainer>
  );
}
