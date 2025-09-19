import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { infospatios } from "../services/rotes";

type Props = {
  patioId: number | null;
  onError?: (msg: string) => void;
};

export default function MapaVagas({ patioId, onError }: Props) {
  const [ocupacao, setOcupacao] = useState<{
    totalMotos: number;
    motosZonaA: number;
    motosZonaB: number;
    totalVagas: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (patioId === null) return;

    let alive = true;

    const fetchOcupacao = async () => {
      try {
        setLoading(true);
        setOcupacao(null);

        const response = await infospatios(patioId);
        const status = response.status;

        if (status === 500) {
          onError?.("Pátio não configurado.");
          return;
        }

        if (alive) setOcupacao(response);
      } catch (error) {
        const statusendpoint = (error as any)?.response?.status;
        if (statusendpoint === 500) {
          onError?.("Pátio não configurado.");
          return;
        }
        onError?.("Erro ao carregar ocupação do pátio.");
        console.error("Erro ao buscar ocupação:", error);
      }
    };

    if (patioId) {
      fetchOcupacao();
    }
  }, [patioId]);

  if (!ocupacao) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1a922e" />
        <Text style={{ marginTop: 8 }}>Carregando mapa...</Text>
      </View>
    );
  }

  const totalVagasPatio = Math.floor(ocupacao.totalVagas / 2);
  const totalVagasManutencao = ocupacao.totalVagas - totalVagasPatio;

  const motosPatio = ocupacao.motosZonaA;
  const motosManutencao = ocupacao.motosZonaB;
  const totalMotos = ocupacao.totalMotos;

  const makeArray = (ocupadas: number, total: number) =>
    Array.from({ length: total }, (_, i) => ({
      id: i,
      ocupada: i < ocupadas,
    }));

  const motosZonaA = makeArray(motosPatio, totalVagasPatio);
  const motosZonaB = makeArray(motosManutencao, totalVagasManutencao);

  const previewMotosA = motosZonaA.slice(0, 20);
  const previewMotosB = motosZonaB.slice(0, 10);

  // ——— helpers ———
  const percent = (qtd: number, total: number) =>
    total === 0 ? 0 : Math.round((qtd / total) * 100);

  const Legend = () => (
    <View style={styles.legend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: "#1a922e" }]} />
        <Text style={styles.legendText}>Ocupada</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: "#E5E7EB" }]} />
        <Text style={styles.legendText}>Livre</Text>
      </View>
    </View>
  );

  const HeaderBar = ({
    title,
    ocupadas,
    total,
  }: {
    title: string;
    ocupadas: number;
    total: number;
  }) => {
    const p = percent(ocupadas, total);
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionStats}>
          <Text style={styles.stat}>
            {ocupadas}/{total}
          </Text>
          <Text style={styles.statMuted}> • {p}%</Text>
        </View>
      </View>
    );
  };

  const Progress = ({ value }: { value: number }) => (
    <View
      style={styles.progressTrack}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: value, min: 0, max: 100 }}
    >
      <View style={[styles.progressFill, { width: `${value}%` }]} />
    </View>
  );

  // ——— Grid responsivo (sem 'gap') ———
  const Grid = ({
    data,
    columns = 8,
    gap = scale(6),
  }: {
    data: { id: number; ocupada: boolean }[];
    columns?: number;
    gap?: number;
  }) => {
    const [w, setW] = useState(0);

    // tamanho da célula = (largura do container - espaços entre colunas) / colunas
    const cell = useMemo(() => {
      if (w <= 0) return scale(32);
      const totalGaps = (columns - 1) * gap;
      const raw = Math.floor((w - totalGaps) / columns);
      // evita célula minúscula ou gigante
      const clamped = Math.max(scale(16), Math.min(raw, scale(38)));
      return clamped;
    }, [w, columns, gap]);

    return (
      <View
        style={styles.gridWrap}
        onLayout={(e) => setW(e.nativeEvent.layout.width)}
      >
        {/* usamos margin nas células; compensamos com margem negativa no contêiner */}
        <View style={[styles.grid, { marginHorizontal: -(gap / 2) }]}>
          {data.map((moto) => (
            <View
              key={moto.id}
              style={[
                styles.cell,
                {
                  width: cell,
                  height: cell,
                  margin: gap / 2,
                  backgroundColor: moto.ocupada ? "#1a922e" : "#E5E7EB",
                },
              ]}
              accessibilityLabel={`Vaga ${moto.id + 1} ${
                moto.ocupada ? "ocupada" : "livre"
              }`}
            />
          ))}
        </View>
      </View>
    );
  };

  const SummaryCard = ({
    patioOcupadas,
    manutOcupadas,
  }: {
    patioOcupadas: number;
    manutOcupadas: number;
  }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Resumo</Text>
      <Divider style={styles.divider} />
      <View style={styles.rowBetween}>
        <Text style={styles.cardText}>Pátio</Text>
        <Text style={styles.cardTextBold}>
          {patioOcupadas}/{totalVagasPatio} (
          {percent(patioOcupadas, totalVagasPatio)}%)
        </Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.cardText}>Manutenção</Text>
        <Text style={styles.cardTextBold}>
          {manutOcupadas}/{totalVagasManutencao} (
          {percent(manutOcupadas, totalVagasManutencao)}%)
        </Text>
      </View>
      <Divider style={[styles.divider, { marginTop: scale(8) }]} />
      <View style={[styles.rowBetween, { marginTop: scale(8) }]}>
        <Text style={styles.cardTextMuted}>Total motos</Text>
        <Text style={styles.cardTextBold}>{totalMotos}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrap}>
      {/* Card compacto com preview */}
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Legend />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setModalVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Expandir mapa"
          >
            <Icon name="arrow-expand" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Zona A */}
        <View style={styles.section}>
          <HeaderBar
            title="Zona A — Pátio"
            ocupadas={motosPatio}
            total={totalVagasPatio}
          />
          <Progress value={percent(motosPatio, totalVagasPatio)} />
          <Grid data={previewMotosA} columns={10} />
        </View>

        {/* Zona B */}
        <View style={styles.section}>
          <HeaderBar
            title="Zona B — Manutenção"
            ocupadas={motosManutencao}
            total={totalVagasManutencao}
          />
          <Progress value={percent(motosManutencao, totalVagasManutencao)} />
          <Grid data={previewMotosB} columns={5} />
        </View>
      </View>

      {/* Modal fullscreen com conteúdo completo */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalRoot}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mapa Completo</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Fechar"
              >
                <Icon name="close" size={22} color="#111" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <View style={styles.section}>
                <HeaderBar
                  title="Zona A — Pátio"
                  ocupadas={motosPatio}
                  total={totalVagasPatio}
                />
                <Progress value={percent(motosPatio, totalVagasPatio)} />
                <Grid data={motosZonaA} columns={12} />
              </View>

              <View style={styles.section}>
                <HeaderBar
                  title="Zona B — Manutenção"
                  ocupadas={motosManutencao}
                  total={totalVagasManutencao}
                />
                <Progress
                  value={percent(motosManutencao, totalVagasManutencao)}
                />
                <Grid data={motosZonaB} columns={6} />
              </View>

              <SummaryCard
                patioOcupadas={motosPatio}
                manutOcupadas={motosManutencao}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // layout base
  wrap: { padding: scale(16) },
  container: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: scale(16),
    gap: verticalScale(16),
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: scale(8),
    shadowOffset: { width: 0, height: verticalScale(3) },
    elevation: 2,
  },

  // header do card
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(12),
  },
  title: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  iconButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: moderateScale(8),
    padding: scale(8),
  },

  // legenda
  legend: { flexDirection: "row", gap: scale(12), alignItems: "center" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: scale(6) },
  legendDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: moderateScale(6),
  },
  legendText: { color: "#374151", fontSize: scale(12) },

  // seção
  section: { gap: verticalScale(8) },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: scale(16), fontWeight: "700", color: "#111827" },
  sectionStats: { flexDirection: "row", alignItems: "baseline", gap: scale(6) },
  stat: { fontSize: scale(14), color: "#111827", fontWeight: "600" },
  statMuted: { fontSize: scale(13), color: "#6B7280" },

  // progresso
  progressTrack: {
    width: "100%",
    height: verticalScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: moderateScale(8),
    backgroundColor: "#1a922e",
  },

  // grid
  gridWrap: {
    width: "100%",
    alignSelf: "stretch",
    marginTop: verticalScale(6),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    borderRadius: moderateScale(6),
  },

  // modal
  modalRoot: { flex: 1, backgroundColor: "#fff" },
  modalHeader: {
    paddingTop: verticalScale(14),
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  modalClose: {
    padding: scale(8),
    borderRadius: moderateScale(8),
    backgroundColor: "#F3F4F6",
  },
  modalScroll: { padding: scale(16), gap: verticalScale(16) },

  // cards auxiliares
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    padding: scale(16),
    gap: verticalScale(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
    marginVertical: verticalScale(8),
  },
  cardTitle: { fontSize: scale(16), fontWeight: "700", color: "#111827" },
  cardText: { fontSize: scale(14), color: "#374151" },
  cardTextBold: { fontSize: scale(14), color: "#111827", fontWeight: "700" },
  cardTextMuted: { fontSize: scale(13), color: "#6B7280" },
});
