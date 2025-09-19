import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "../components/dropdown";
import Header from "../components/header";
import MapaMotos from "../components/mapa";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

export default function Home() {
  const navigation = useNavigation();
  const [patioId, setPatioId] = React.useState<number | null>(null);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const handleSelectPatio = (id: number) => {
    setApiError(null); // limpa mensagem quando troca de pátio
    setPatioId(id);
  };

  return (
    <View style={styles.container}>
      <Header />

      <Dropdown onSelect={handleSelectPatio} />

      <View style={{ margin: 10 }}>
        <Text style={styles.filialTitle}>Mapa de Vagas:</Text>

        {patioId == null ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Nenhum pátio selecionado.
            </Text>
            <Text style={styles.placeholderSub}>
              Selecione um pátio no topo para visualizar o mapa.
            </Text>
          </View>
        ) : apiError ? (
          <View style={styles.placeholder}>
            <Text style={[styles.placeholderText, { color: "#721C24" }]}>
              {apiError}
            </Text>
            <Text style={[styles.placeholderSub, { color: "#721C24" }]}>
              Verifique a configuração do pátio ou tente novamente.
            </Text>
          </View>
        ) : (
          <MapaMotos patioId={patioId} onError={setApiError} />
        )}
      </View>

      <TouchableOpacity
        style={styles.search}
        onPress={() =>
          navigation.navigate("Search" as never, { patioId } as never)
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
  container: { flex: 1, backgroundColor: "#f2f2f7" },
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
  placeholder: {
    marginHorizontal: 16,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  placeholderText: { fontSize: 16, fontWeight: "700", color: "#222" },
  placeholderSub: { marginTop: 6, color: "#666", textAlign: "center" },
});
