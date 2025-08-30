import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Header from "../components/header";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CardVeiculo from "../components/card";
import { useRoute } from "@react-navigation/native";
import InputField from "../components/InputField";

export default function Search() {
  const route = useRoute();
  const { filial } = route.params as { filial: string | null };

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
      <Text style={styles.titlePrinc}>
        {filial ?? "nenhuma filial selecionada"}
      </Text>

      <View style={styles.linha}>
        <Text style={styles.placaLabel}>Placa:</Text>
        <View style={styles.inputWrapper}>
          <InputField
            style={styles.input}
            value={text}
            onChangeText={setText}
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
    backgroundColor: "#f2f2f7",
    flex: 1,
  },
  titlePrinc: {
    fontSize: scale(20),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(-20),
  },
  zonasContainer: {
    gap: verticalScale(10),
    padding: scale(10),
  },
  zonaLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  zonaLabel: {
    fontSize: scale(14),
    width: scale(60),
    marginLeft: scale(10),
  },
  placaLabel: {
    fontSize: scale(14),
    width: scale(60),
    marginLeft: scale(10),
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: verticalScale(20),
    padding: scale(10),
  },
  label: {
    width: scale(60),
    fontSize: scale(16),
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "white",
    marginBottom: 20,
    height: verticalScale(40),
    fontSize: scale(16),
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: moderateScale(8),
    marginTop: verticalScale(12),
    padding: scale(4),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    alignItems: "center",
    marginHorizontal: scale(2),
  },
  tabSelecionado: {},
  tabText: {
    fontSize: scale(14),
  },
  tabTextSelecionado: {
    fontWeight: "bold",
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: moderateScale(11),
    height: verticalScale(40),
    paddingHorizontal: scale(10),
  },
});
