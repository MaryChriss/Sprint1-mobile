import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../components/header";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CardVeiculo from "../../components/card";

export default function Search() {
  const motos = [
    { placa: "ABC1D23", local: "Zona 02" },
    { placa: "JKL4M56", local: "Zona 02" },
    { placa: "MNB3V12", local: "Zona 02" },
    { placa: "LSN4I49", local: "Zona 02" },
    { placa: "PLM1A45", local: "Zona 02" },
  ];

  const zonasOpcoes = [
    { label: "zona A", value: "zona A" },
    { label: "zona B", value: "zona B" },
  ];

  const [zonaSelecionada, setZonaSelecionada] = useState(null);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.titlePrinc}>Sua busca começa aqui</Text>

      <View style={styles.linha}>
        <Text style={styles.placaLabel}>Placa:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            underlineColor="transparent"
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            theme={{ colors: { text: "#000", background: "#fff" } }}
          />
        </View>
      </View>

      <View style={styles.zonasContainer}>
        <View style={styles.zonaLinha}>
          <Text style={styles.zonaLabel}>Local:</Text>
          <Dropdown
            style={styles.dropdown}
            data={zonasOpcoes}
            labelField="label"
            valueField="value"
            placeholder=""
            value={zonaSelecionada}
            onChange={(item) => setZonaSelecionada(item.value)}
          />
        </View>
      </View>

      <ScrollView style={{ marginTop: 20, padding: 15 }}>
        {motos.map((item, index) => (
          <CardVeiculo key={index} placa={item.placa} local={item.local} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  titlePrinc: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  zonasContainer: {
    gap: 10,
    padding: 10,
  },
  zonaLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  zonaLabel: {
    color: "#fff",
    fontSize: 14,
    width: 60,
    marginLeft: 10,
  },
  placaLabel: {
    color: "#fff",
    fontSize: 14,
    width: 60,
    marginLeft: 10,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 20,
    padding: 10,
  },
  label: {
    width: 60,
    color: "#fff",
    fontSize: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#333",
    borderRadius: 8,
    marginTop: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 2,
  },
  tabSelecionado: {
    backgroundColor: "#fff",
  },
  tabText: {
    color: "#ccc",
    fontSize: 14,
  },
  tabTextSelecionado: {
    color: "#000",
    fontWeight: "bold",
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
  },
});
