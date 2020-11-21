import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import SelectMultiple from "react-native-select-multiple";
import dataSelection from "./dataSelection.json";

const Sktm = (props) => {
  const listDataSKTM = dataSelection.listDataSKTM;

  return (
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
              SUTM/SKUTM
            </Text>
          </View>
        </View>

        <View>
          <View>
            <SelectMultiple
              items={listDataSKTM}
              selectedItems={props.selectedItems}
              onSelectionsChange={(value) =>
                props.onSelectionsChange(value, "sktm")
              }
            />
          </View>

          <Button
            mode={"contained"}
            onPress={() => props.handlingModalAct(false, "_modalSKTM")}
          >
            <Text>Simpan</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
export default Sktm;

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
