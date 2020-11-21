import React, { Component } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Button, List } from "react-native-paper";

const DaftarTO = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <View style={{ padding: 5, backgroundColor: "lightseagreen" }}>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            DAFTAR KODE TO TERUNDUH
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <List.Item
            title="First Item"
            description="Item description"
            left={(props) => <List.Icon {...props} icon="check" />}
            right={(props) => (
              <Button mode="text">
                <Text>asd</Text>
              </Button>
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DaftarTO;
