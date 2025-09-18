import { List } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { listPatios } from "../services/rotes";

export default function Dropdown({
  onSelect,
}: {
  onSelect?: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Selecione uma filial");
  const [patios, setpatios] = useState<{ id: number; nome: string}[]>([]);


  const handleSelect = (id: number, nome: string) => {
    setSelectedItem(nome);
    setExpanded(false);
    if (onSelect) {
      onSelect(id);
    }
  };

  useEffect(() => {
    const patios = async () => {
      try {
        const response = await listPatios();
        setpatios(response);
      } catch (e) {
        console.error(e)
      }
    };

    patios();
  }, []);
  
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
          {patios.map((patio) => (
            <List.Item
              key={patio.id}
              title={patio.nome}
              onPress={() => handleSelect(patio.id, patio.nome)}
              style={styles.item}
              titleStyle={styles.itemTitle}
            />
          ))}
        </List.Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filialTitle: {
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
