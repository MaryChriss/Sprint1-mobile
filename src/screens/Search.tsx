import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Header from "../components/header";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CardVeiculo from "../components/card";
import { useRoute } from "@react-navigation/native";
import InputField from "../components/InputField";
import { buscarMotosNoPatio } from "../services/rotes";

type TipoZona = "A" | "B";

type MotoDTO = {
  id: number;
  modelo: string;
  placa: string;
  tipoZona: TipoZona | null;
  zonaId: number | null;
  status: "ALUGADA" | "DISPONIVEL" | "MANUTENCAO";
  patioId: number | null;
};

const useDebounced = (value: string, delay = 350) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
};

export default function Search() {
  const route = useRoute();
  const { patioId } = route.params as { patioId: string | null };

  const [zonaSelecionada, setZonaSelecionada] = useState<TipoZona | "">("");
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState<MotoDTO[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const placaDebounced = useDebounced(placa, 350);

  const zonasOpcoes = useMemo(
    () => [
      { label: "zona A", value: "A" },
      { label: "zona B", value: "B" },
    ],
    []
  );

  const [text, setText] = useState("");

  useEffect(() => {
    let alive = true;

    const run = async () => {
      setErro(null);
      setLista([]);
      if (patioId == null) return;

      const params: any = {};
      if (placaDebounced.trim())
        params.placa = placaDebounced.trim().toUpperCase();
      if (zonaSelecionada) params.tipoZona = zonaSelecionada;

      try {
        setLoading(true);
        const page = await buscarMotosNoPatio(Number(patioId), params);
        if (!alive) return;
        setLista(page.content ?? []);
      } catch (e: any) {
        if (!alive) return;
        setErro(e?.response?.data?.message || "Erro ao buscar motos.");
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [patioId, placaDebounced, zonaSelecionada]);

  if (patioId == null) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Nenhum pátio selecionado. Volte e selecione um pátio.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titlePrinc}>Buscar motos</Text>

      <View style={styles.linha}>
        <Text style={styles.placaLabel}>Placa:</Text>
        <View style={styles.inputWrapper}>
          <InputField
            style={styles.input}
            value={placa}
            onChangeText={setPlaca}
            autoCapitalize="characters"
            placeholder="ABC1D23"
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
            onChange={(item) => setZonaSelecionada(item.value as TipoZona)}
          />
        </View>
      </View>

      {loading ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Buscando...</Text>
        </View>
      ) : erro ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: "#B00020" }}>{erro}</Text>
        </View>
      ) : (
        <ScrollView style={{ marginTop: 20, padding: 15 }}>
          {lista.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#666" }}>
              Nenhum resultado para os filtros atuais.
            </Text>
          ) : (
            lista.map((m) => (
              <CardVeiculo
                key={m.id}
                placa={m.placa}
                local={m.tipoZona ? `Zona ${m.tipoZona}` : "Sem zona"}
              />
            ))
          )}
        </ScrollView>
      )}
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
