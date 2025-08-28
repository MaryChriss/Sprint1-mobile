import { List } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

export default function Dropdown({ onSelect }: {onSelect?: (item: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Selecione uma filial");

  const route = useRoute();
  const handlePress = () => setExpanded(!expanded);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setExpanded(false);
    if(onSelect) {
      onSelect(item)
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.filialTitle}>Filial selecionada:</Text>

      <View style={styles.dropdownContainer}>
        <List.Accordion
          title={selectedItem}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          titleStyle={styles.title}
          style={styles.accordion}
          left={(props) => (
            <Entypo {...props} name="dot-single" size={24} color="white" />
          )}
        >
          <List.Item
            title="Paulista"
            onPress={() => handleSelect("Paulista")}
            style={styles.item}
            titleStyle={styles.itemTitle}
          />
          <List.Item
            title="Santana"
            onPress={() => handleSelect("Santana")}
            style={styles.item}
            titleStyle={styles.itemTitle}
          />
          <List.Item
            title="Osasco"
            onPress={() => handleSelect("Osasco")}
            style={styles.item}
            titleStyle={styles.itemTitle}
          />
        </List.Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filialTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 4,
    marginBottom: 10,
  },
  wrapper: {
    position: "absolute",
    top: 80,
    left: 40,
    right: 40,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dropdownContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 2,
  },
  accordion: {
    backgroundColor: "white",
  },
  title: {
    color: "#333",
    fontSize: 16,
  },
  item: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  itemTitle: {
    color: "#333",
    fontSize: 14,
  },
});
