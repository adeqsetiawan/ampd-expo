import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import SelectMultiple from "react-native-select-multiple";
import dataSelection from "./dataSelection.json";

const Tiang = (props) => {
  const listDataTiang = dataSelection.listDataTiang;

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.modal2}>
        <View style={styles.modal}>
          <View style={{ backgroundColor: "#535c68" }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#fff",
                  padding: 20,
                }}
              >
                TIANG
              </Text>
            </View>
          </View>

          <View>
            <SelectMultiple
              items={listDataTiang}
              selectedItems={props.selectedItems}
              onSelectionsChange={(value) =>
                props.onSelectionsChange(value, "tiang")
              }
            />
          </View>

          <View>
            <Button
              mode={"contained"}
              onPress={() => props.handlingModalAct(false, "_modalTiang")}
            >
              <Text>Simpan</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Tiang;

const styles = StyleSheet.create({
  modal: {
    borderWidth: 0.3,
    borderColor: "grey",
    margin: 50,
    justifyContent: "center",
    backgroundColor: "#fff",
    // padding: 100,
  },
  modal2: {
    flex: 1,
    backgroundColor: "#00000099",
    // padding: 100,
  },
});
