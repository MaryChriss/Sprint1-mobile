import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "../components/dropdown";
import Header from "../components/header";
import MapaMotos from "../components/mapa";
import { useNavigation, useTheme } from "@react-navigation/native"; // ⬅️ useTheme
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

export default function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme(); // ⬅️ tema
  const [patioId, setPatioId] = React.useState<number | null>(null);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const handleSelectPatio = (id: number) => {
    setApiError(null);
    setPatioId(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />

      <Dropdown onSelect={handleSelectPatio} />

      <View style={{ margin: 10 }}>
        <Text style={[styles.filialTitle, { color: colors.text }]}>
          Mapa de Vagas:
        </Text>

        {patioId == null ? (
          <View style={styles.placeholder}>
            <Text style={[styles.placeholderText, { color: colors.text }]}>
              Nenhum pátio selecionado.
            </Text>
            <Text
              style={[
                styles.placeholderSub,
                { color: colors.text, opacity: 0.6 },
              ]}
            >
              Selecione um pátio no topo para visualizar o mapa.
            </Text>
          </View>
        ) : apiError ? (
          <View style={styles.placeholder}>
            <Text style={[styles.placeholderText, { color: colors.primary }]}>
              {apiError}
            </Text>
            <Text style={[styles.placeholderSub, { color: colors.primary }]}>
              Verifique a configuração do pátio ou tente novamente.
            </Text>
          </View>
        ) : (
          <MapaMotos patioId={patioId} onError={setApiError} />
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.search,
          { backgroundColor: colors.primary, shadowColor: colors.text },
        ]}
        onPress={() =>
          navigation.navigate("Search" as never, { patioId } as never)
        }
      >
        <AntDesign name="search1" size={24} color="#fff" />
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
  container: { flex: 1 },
  search: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
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
  placeholderText: { fontSize: 16, fontWeight: "700" },
  placeholderSub: { marginTop: 6, textAlign: "center" },
});
