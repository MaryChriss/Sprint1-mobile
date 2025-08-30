import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "../components/dropdown";
import Header from "../components/header";
import MapaMotos from "../components/mapa";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

export default function Home() {
  const navigation = useNavigation();
  const [filialSelecionada, setFilialSelecionada] = React.useState<
    string | null
  >(null);

  return (
    <View style={styles.container}>
      <Header />

      <Dropdown onSelect={(item) => setFilialSelecionada(item)} />
      <View style={{ margin: 10 }}>
        <Text style={styles.filialTitle}>Mapa de Vagas:</Text>
        <MapaMotos />
      </View>

      <TouchableOpacity
        style={styles.search}
        onPress={() =>
          navigation.navigate(
            "Search" as never,
            { filial: filialSelecionada } as never
          )
        }
      >
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filialTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 150,
    marginLeft: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  search: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#1a922e",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
