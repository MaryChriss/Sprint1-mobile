import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

import Header from "../components/header";
import InputField from "../components/InputField";
import Counter from "../components/counter";
import {
  listPatios,
  postPatio,
  putPatio,
  deletePatio,
  Patio,
} from "../services/rotes";

type FieldErrors = {
  nome?: string;
  quantidadeVagas?: string;
  metragemZonaA?: string;
  metragemZonaB?: string;
  form?: string;
};

export default function PatioManagement() {
  const { colors, dark } = useTheme();

  const [patios, setPatios] = useState<Patio[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [mode, setMode] = useState<"list" | "form">("list");
  const [refreshing, setRefreshing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loadingSave, setLoadingSave] = useState(false);

  const [nome, setNome] = useState("");
  const [quantidadeVagas, setQuantidadeVagas] = useState(60);
  const [metragemZonaA, setMetragemZonaA] = useState("");
  const [metragemZonaB, setMetragemZonaB] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isEditing = editingId !== null;

  const resetForm = (stayOnForm = false) => {
    setEditingId(null);
    setNome("");
    setQuantidadeVagas(60);
    setMetragemZonaA("");
    setMetragemZonaB("");
    setErrors({});
    setSuccessMsg(null);
    if (!stayOnForm) setMode("list");
  };

  const fillForm = (p: Patio) => {
    setEditingId(p.id);
    setNome(p.nome);
    setQuantidadeVagas(p.quantidadeVagas);
    setMetragemZonaA(String(p.metragemZonaA));
    setMetragemZonaB(String(p.metragemZonaB));
    setErrors({});
    setSuccessMsg(null);
    setMode("form");
  };

  const validate = () => {
    const a = Number(metragemZonaA);
    const b = Number(metragemZonaB);
    const next: FieldErrors = {};

    if (!nome.trim()) next.nome = "Informe o nome da filial.";
    if (!Number.isInteger(quantidadeVagas) || quantidadeVagas < 60) {
      next.quantidadeVagas = "Quantidade de vagas mínima é 60.";
    }
    if (!Number.isFinite(a) || a <= 0)
      next.metragemZonaA = "Metragem A inválida";
    if (!Number.isFinite(b) || b <= 0)
      next.metragemZonaB = "Metragem B inválida";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const loadPatios = useCallback(async () => {
    try {
      setLoadingList(true);
      const data = await listPatios();
      setPatios(Array.isArray(data) ? data : []);
    } catch {
      setErrors({ form: "Não foi possível carregar os pátios." });
    } finally {
      setLoadingList(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPatios();
    setRefreshing(false);
  }, [loadPatios]);

  useFocusEffect(
    useCallback(() => {
      loadPatios();
    }, [loadPatios])
  );
  const goToList = useCallback(async () => {
    setMode("list");
    await loadPatios();
  }, [loadPatios]);

  useEffect(() => {
    loadPatios();
  }, [loadPatios]);

  const handleSave = async () => {
    setSuccessMsg(null);
    setErrors({});
    if (!validate()) return;

    const payload = {
      nome: nome.trim(),
      quantidadeVagas,
      metragemZonaA: Number(metragemZonaA),
      metragemZonaB: Number(metragemZonaB),
    };

    try {
      setLoadingSave(true);
      if (isEditing) {
        await putPatio(editingId!, payload);
        setSuccessMsg("Pátio atualizado com sucesso!");
      } else {
        await postPatio(payload);
        setSuccessMsg("Pátio cadastrado com sucesso!");
      }
      await goToList();
      resetForm();
    } catch (error: any) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Erro ao salvar o pátio.";

      const details: Array<{ field?: string; message?: string }> =
        error?.response?.data?.errors;

      if (Array.isArray(details) && details.length) {
        const next: FieldErrors = { form: serverMsg };
        details.forEach((e) => {
          if (e.field && e.message) {
            if (e.field === "nome") next.nome = e.message;
            if (e.field === "quantidadeVagas") next.quantidadeVagas = e.message;
            if (e.field === "metragemZonaA") next.metragemZonaA = e.message;
            if (e.field === "metragemZonaB") next.metragemZonaB = e.message;
          }
        });
        setErrors(next);
      } else {
        setErrors({ form: serverMsg });
      }
    } finally {
      setLoadingSave(false);
    }
  };

  const confirmDelete = (p: Patio) => {
    Alert.alert(
      "Excluir pátio",
      `Tem certeza que deseja excluir "${p.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => handleDelete(p.id),
        },
      ]
    );
  };

  const handleDelete = async (id: number) => {
    setErrors({});
    setSuccessMsg(null);
    try {
      await deletePatio(id);
      if (editingId === id) resetForm();
      await loadPatios();
      setSuccessMsg("Pátio excluído com sucesso!");
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "Erro ao excluir o pátio.";
      setErrors({ form: msg });
    }
  };

  const renderItem = ({ item }: { item: Patio }) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{item.nome}</Text>
        <Text style={styles.rowSub}>
          Vagas: {item.quantidadeVagas} • A: {item.metragemZonaA} • B:{" "}
          {item.metragemZonaB}
        </Text>
      </View>
      <View style={styles.rowActions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() => fillForm(item)}
        >
          <Text style={styles.actionTxt}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => confirmDelete(item)}
        >
          <Text style={styles.actionTxt}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["left", "right"]}
    >
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Header />

        <View style={styles.content}>
          <Text style={[styles.titlePrinc, { color: colors.text }]}>
            Gerenciar Pátios
          </Text>

          {successMsg && (
            <View
              style={[
                styles.banner,
                {
                  backgroundColor: dark
                    ? "rgba(46,153,54,0.18)"
                    : "rgba(232,245,233,1)",
                },
                {
                  borderColor: colors.border,
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <Text style={[styles.bannerText, { color: colors.text }]}>
                {successMsg}
              </Text>
            </View>
          )}

          {!!errors.form && (
            <View
              style={[
                styles.banner,
                {
                  backgroundColor: dark
                    ? "rgba(235,68,53,0.18)"
                    : "rgba(253,236,234,1)",
                },
                {
                  borderColor: colors.border,
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <Text style={[styles.bannerText, { color: colors.text }]}>
                {errors.form}
              </Text>
            </View>
          )}

          {mode === "list" ? (
            <View
              style={[
                styles.card,
                {
                  flex: 1,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  Pátios cadastrados
                </Text>

                <TouchableOpacity
                  style={[
                    styles.newBtn,
                    {
                      backgroundColor: dark ? "#2A2A2A" : "#F3F4F6",
                      borderColor: colors.border,
                      borderWidth: StyleSheet.hairlineWidth,
                    },
                  ]}
                  onPress={() => {
                    resetForm(true);
                    setMode("form");
                  }}
                >
                  <Text style={[styles.newBtnTxt, { color: colors.text }]}>
                    Novo
                  </Text>
                </TouchableOpacity>
              </View>

              {loadingList ? (
                <Text style={{ color: colors.text, opacity: 0.7 }}>
                  Carregando...
                </Text>
              ) : patios.length === 0 ? (
                <Text style={{ color: colors.text, opacity: 0.7 }}>
                  Nenhum pátio encontrado.
                </Text>
              ) : (
                <FlatList
                  data={patios}
                  keyExtractor={(it) => String(it.id)}
                  renderItem={({ item }) => (
                    <View style={styles.row}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.rowTitle, { color: colors.text }]}>
                          {item.nome}
                        </Text>
                        <Text
                          style={[
                            styles.rowSub,
                            { color: colors.text, opacity: 0.7 },
                          ]}
                        >
                          Vagas: {item.quantidadeVagas} • A:{" "}
                          {item.metragemZonaA} • B: {item.metragemZonaB}
                        </Text>
                      </View>

                      <View style={styles.rowActions}>
                        <TouchableOpacity
                          style={[
                            styles.actionBtn,
                            {
                              backgroundColor: dark
                                ? "rgba(37,99,235,0.18)"
                                : "#E5F6FF",
                            },
                          ]}
                          onPress={() => fillForm(item)}
                        >
                          <Text
                            style={[styles.actionTxt, { color: colors.text }]}
                          >
                            Editar
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.actionBtn,
                            {
                              backgroundColor: dark
                                ? "rgba(235,68,53,0.18)"
                                : "#FDECEA",
                            },
                          ]}
                          onPress={() => confirmDelete(item)}
                        >
                          <Text
                            style={[styles.actionTxt, { color: colors.text }]}
                          >
                            Excluir
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  ItemSeparatorComponent={() => (
                    <View
                      style={[
                        styles.separator,
                        { backgroundColor: colors.border },
                      ]}
                    />
                  )}
                  style={{ flex: 1 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              )}
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 120 }}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    {isEditing ? "Editar Pátio" : "Novo Pátio"}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.newBtn,
                      {
                        backgroundColor: dark ? "#2A2A2A" : "#F3F4F6",
                        borderColor: colors.border,
                        borderWidth: StyleSheet.hairlineWidth,
                      },
                    ]}
                    onPress={goToList}
                  >
                    <Text style={[styles.newBtnTxt, { color: colors.text }]}>
                      Voltar
                    </Text>
                  </TouchableOpacity>
                </View>

                <InputField
                  label="Nome da Filial"
                  value={nome}
                  onChangeText={(v) => {
                    setNome(v);
                    if (errors.nome)
                      setErrors((p) => ({ ...p, nome: undefined }));
                  }}
                  placeholder="Ex: Filial Centro"
                  style={{
                    marginBottom: 8,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                  textColor={colors.text}
                  placeholderTextColor={colors.text + "99"}
                  labelColor={colors.text}
                />
                {!!errors.nome && (
                  <Text
                    style={[
                      styles.errorText,
                      { color: dark ? "#FF8A80" : "#E53935" },
                    ]}
                  >
                    {errors.nome}
                  </Text>
                )}

                <Counter
                  label="Quantidade de Vagas"
                  value={quantidadeVagas}
                  onIncrease={() => {
                    setQuantidadeVagas((q) => q + 1);
                    if (errors.quantidadeVagas)
                      setErrors((p) => ({ ...p, quantidadeVagas: undefined }));
                  }}
                  onDecrease={() => {
                    setQuantidadeVagas((q) => Math.max(60, q - 1));
                    if (errors.quantidadeVagas)
                      setErrors((p) => ({ ...p, quantidadeVagas: undefined }));
                  }}
                  labelColor={colors.text}
                  textColor={colors.text}
                  bgColor={colors.card}
                  borderColor={colors.border}
                />
                {!!errors.quantidadeVagas && (
                  <Text
                    style={[
                      styles.errorText,
                      { color: dark ? "#FF8A80" : "#E53935" },
                    ]}
                  >
                    {errors.quantidadeVagas}
                  </Text>
                )}

                <InputField
  label="Metragem Zona A"
  value={metragemZonaA}
  onChangeText={(v) => {
    setMetragemZonaA(v);
    if (errors.metragemZonaA)
      setErrors((p) => ({ ...p, metragemZonaA: undefined }));
  }}
  placeholder="Ex: 120"
  keyboardType="numeric"
  style={{
    marginBottom: 8,
    backgroundColor: colors.card,
    borderColor: colors.border,
  }}
  textColor={colors.text}
  placeholderTextColor={colors.text + "99"}
  labelColor={colors.text}
/>
{!!errors.metragemZonaA && (
  <Text
    style={[
      styles.errorText,
      { color: dark ? "#FF8A80" : "#E53935" },
    ]}
  >
    {errors.metragemZonaA}
  </Text>
)}

<InputField
  label="Metragem Zona B"
  value={metragemZonaB}
  onChangeText={(v) => {
    setMetragemZonaB(v);
    if (errors.metragemZonaB)
      setErrors((p) => ({ ...p, metragemZonaB: undefined }));
  }}
  placeholder="Ex: 150"
  keyboardType="numeric"
  style={{
    marginBottom: 8,
    backgroundColor: colors.card,
    borderColor: colors.border,
  }}
  textColor={colors.text}
  placeholderTextColor={colors.text + "99"}
  labelColor={colors.text}
/>
{!!errors.metragemZonaB && (
  <Text
    style={[
      styles.errorText,
      { color: dark ? "#FF8A80" : "#E53935" },
    ]}
  >
    {errors.metragemZonaB}
  </Text>
)}


                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[
                      styles.saveBtn,
                      { backgroundColor: colors.primary },
                      loadingSave && { opacity: 0.7 },
                    ]}
                    onPress={handleSave}
                    disabled={loadingSave}
                  >
                    <Text style={styles.saveTxt}>
                      {loadingSave
                        ? isEditing
                          ? "Atualizando..."
                          : "Salvando..."
                        : isEditing
                        ? "Atualizar"
                        : "Salvar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  screen: { flex: 1 },
  content: { flex: 1, padding: 16 },
  titlePrinc: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 8,
    color: "#111827",
  },
  banner: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  bannerSuccess: { backgroundColor: "#E8F5E9" },
  bannerError: { backgroundColor: "#FDECEA" },
  bannerText: { color: "#111827", fontWeight: "700" },

  card: {
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.06)",
    height: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  newBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  newBtnTxt: { fontWeight: "700", color: "#111" },

  input: { marginBottom: 8, backgroundColor: "#fff" },
  errorText: {
    color: "#E53935",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    height: 60,
  },
  rowTitle: { fontWeight: "800", color: "#111827" },
  rowSub: { color: "#6B7280", marginTop: 2, fontSize: 12 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  rowActions: { flexDirection: "row", gap: 8, marginLeft: 8 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10 },
  editBtn: { backgroundColor: "#E5F6FF" },
  deleteBtn: { backgroundColor: "#FDECEA" },
  actionTxt: { fontWeight: "700", color: "#111" },

  formActions: { flexDirection: "row", gap: 10, marginTop: 10 },
  saveBtn: {
    flex: 1,
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
  cancelBtn: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cancelTxt: { color: "#111", fontSize: 14, fontWeight: "700" },
});
