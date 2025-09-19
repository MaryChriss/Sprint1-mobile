import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CardVeiculo from "../components/card";
import { useRoute, useTheme } from "@react-navigation/native";
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
  const { colors } = useTheme();
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
      { label: "Zona A", value: "A" },
      { label: "Zona B", value: "B" },
    ],
    []
  );

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
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
          Nenhum pátio selecionado. Volte e selecione um pátio.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.titlePrinc, { color: colors.text }]}>
        Buscar motos
      </Text>

      <View style={styles.linha}>
        <Text style={[styles.placaLabel, { color: colors.text }]}>Placa:</Text>
        <View style={styles.inputWrapper}>
          <InputField
            style={[
              styles.input,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            value={placa}
            onChangeText={setPlaca}
            placeholder="ABC1D23"
            label={""}
          />
        </View>
      </View>

      <View style={styles.zonasContainer}>
        <View style={styles.zonaLinha}>
          <Text style={[styles.zonaLabel, { color: colors.text }]}>Local:</Text>

          <Dropdown
            style={[
              styles.dropdown,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: StyleSheet.hairlineWidth,
              },
            ]}
            containerStyle={{
              backgroundColor: colors.card,
              borderRadius: 12,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            }}
            placeholderStyle={{ color: colors.text + "99" }}
            selectedTextStyle={{ color: colors.text, fontSize: scale(14) }}
            itemTextStyle={{ color: colors.text }}
            activeColor={colors.border}
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
          <ActivityIndicator color={colors.primary} />
          <Text style={{ marginTop: 8, color: colors.text }}>Buscando...</Text>
        </View>
      ) : erro ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: colors.primary }}>{erro}</Text>
        </View>
      ) : (
        <ScrollView style={{ marginTop: 20, padding: 15 }}>
          {lista.length === 0 ? (
            <Text
              style={{ textAlign: "center", color: colors.text, opacity: 0.6 }}
            >
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
  container: { flex: 1 },
  titlePrinc: {
    fontSize: scale(20),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(-20),
  },
  zonasContainer: { gap: verticalScale(10), padding: scale(10) },
  zonaLinha: { flexDirection: "row", alignItems: "center" },
  zonaLabel: { fontSize: scale(14), width: scale(60), marginLeft: scale(10) },
  placaLabel: { fontSize: scale(14), width: scale(60), marginLeft: scale(10) },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
    padding: scale(10),
  },
  inputWrapper: { flex: 1 },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    height: verticalScale(40),
    fontSize: scale(16),
    borderRadius: moderateScale(11),
    borderWidth: StyleSheet.hairlineWidth,
  },
  dropdown: {
    flex: 1,
    borderRadius: moderateScale(11),
    height: verticalScale(40),
    paddingHorizontal: scale(10),
  },
});
