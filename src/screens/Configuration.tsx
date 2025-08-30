import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";

import Header from "../components/header";
import InputField from "../components/InputField";
import Counter from "../components/counter";

export default function Configuration() {
  const insets = useSafeAreaInsets();

  const [filial, setFilial] = useState("");
  const [quantidade, setQuantidade] = useState(60);
  const [metragemPatio, setMetragemPatio] = useState("");
  const [metragemManutencao, setMetragemManutencao] = useState("");

  const handleSave = async () => {
    if (!filial || !metragemPatio || !metragemManutencao) {
      showMessage({
        message: "Preencha todos os campos",
        description: "Nome da Filial, metragem do Pátio e da Manutenção.",
        type: "warning",
      });
      return;
    }

    const data = {
      filial,
      quantidade,
      metragemPatio: Number(metragemPatio),
      metragemManutencao: Number(metragemManutencao),
      updatedAt: new Date().toISOString(),
    };
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      <View style={styles.screen}>
        <Header />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingBottom: 120 }]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titlePrinc}>Configurar Pátio</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informações da Filial</Text>

            <InputField
              label="Nome da Filial"
              value={filial}
              onChangeText={setFilial}
              placeholder="Ex: Filial Centro"
              style={styles.input}
            />

            <Counter
              label="Quantidade de Vagas"
              value={quantidade}
              onIncrease={() => setQuantidade((q) => q + 1)}
              onDecrease={() => setQuantidade((q) => Math.max(30, q - 1))}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Zonas e Metragens</Text>

            <InputField
              label="Metragem Zona A (Pátio)"
              value={metragemPatio}
              onChangeText={setMetragemPatio}
              placeholder="Ex: 200"
              keyboardType="numeric"
              style={styles.input}
            />

            <InputField
              label="Metragem Zona B (Manutenção)"
              value={metragemManutencao}
              onChangeText={setMetragemManutencao}
              placeholder="Ex: 120"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gateways</Text>
            <View style={styles.gatewayContainer}>
              <View style={styles.gatewayBox}>
                <Text style={styles.gatewayLabel}>Zona A</Text>
                <Text style={styles.gatewayValue}>1</Text>
              </View>
              <View style={styles.gatewayBox}>
                <Text style={styles.gatewayLabel}>Zona B</Text>
                <Text style={styles.gatewayValue}>1</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveTxt}>Salvar configurações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f2f7" },
  screen: { flex: 1, backgroundColor: "#f2f2f7" },
  content: { padding: 16 },
  titlePrinc: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 8,
    color: "#111827",
  },
  card: {
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  input: { marginBottom: 8, backgroundColor: "#fff" },
  gatewayContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  gatewayBox: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.06)",
  },
  gatewayLabel: { fontWeight: "600", fontSize: 13, color: "#374151" },
  gatewayValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2E9936",
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  saveBtn: {
    backgroundColor: "#2E9936",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  saveTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
