import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import SelectMultiple from "react-native-select-multiple";
import dataSelection from "./dataSelection.json";
import { ScrollView } from "react-native-gesture-handler";
const Trafo = (props) => {
  const listDataTrafo2 = dataSelection.listDataTrafo2;

  return (
    <ScrollView>
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
                TRAFO II
              </Text>
            </View>
          </View>
          <View>
            <SelectMultiple
              items={listDataTrafo2}
              selectedItems={props.selectedItems}
              onSelectionsChange={(value) =>
                props.onSelectionsChange(value, "trafo2")
              }
            />
          </View>

          <View>
            <Button
              mode={"contained"}
              onPress={() => props.handlingModalAct(false, "_modalTrafo2")}
            >
              <Text>Simpan</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Trafo;

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
