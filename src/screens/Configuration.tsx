import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import MapaVagas from "../../components/mapa";
import InputField from "../../components/InputField";
import Counter from "../../components/counter";

export default function Configuration() {
  const [filial, setFilial] = useState("");
  const [quantidade, setQuantidade] = useState(60);
  const [metragemPatio, setMetragemPatio] = useState("");
  const [metragemManutencao, setMetragemManutencao] = useState("");

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titlePrinc}>Configure o Pátio:</Text>

        <InputField
          label="Nome da Filial"
          value={filial}
          onChangeText={setFilial}
          placeholder="Digite o nome da filial"
        />

        <Counter
          label="Qnt. de Vagas"
          value={quantidade}
          onIncrease={() => setQuantidade((q) => q + 1)}
          onDecrease={() => setQuantidade((q) => Math.max(30, q - 1))}
        />

        <InputField
          label="Metragem Zona A (Pátio)"
          value={metragemPatio}
          onChangeText={setMetragemPatio}
          placeholder="Ex: 200"
          keyboardType="numeric"
          suffix="m²"
        />

        <InputField
          label="Metragem Zona B (Manutenção)"
          value={metragemManutencao}
          onChangeText={setMetragemManutencao}
          placeholder="Ex: 120"
          keyboardType="numeric"
          suffix="m²"
        />

        <View style={styles.gatewayContainer}>
          <View style={styles.gatewayBox}>
            <Text style={styles.gatewayLabel}>Gateway Zona A</Text>
            <Text style={styles.gatewayValue}>1</Text>
          </View>
          <View style={styles.gatewayBox}>
            <Text style={styles.gatewayLabel}>Gateway Zona B</Text>
            <Text style={styles.gatewayValue}>1</Text>
          </View>
        </View>

        <Text style={styles.titlemap}>Visualização:</Text>
        <MapaVagas />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#242424" },
  content: { padding: 20, paddingBottom: 40 }, // só o conteúdo tem padding
  titlePrinc: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  gatewayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  gatewayBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    width: 150,
    alignItems: "center",
  },
  gatewayLabel: { fontWeight: "bold", fontSize: 14, color: "#333" },
  gatewayValue: { fontSize: 20, fontWeight: "bold", color: "green" },
  titlemap: { color: "#fff", fontSize: 16, marginBottom: 10, marginLeft: 5 },
});
