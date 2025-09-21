import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation, useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUser, getUser, putUser } from "../services/rotes";

type UserData = {
  idUser: number;
  nomeUser: string;
  email: string;
  phone: string;
  language?: string;
  theme?: string;
};

export default function Profile() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<UserData | null>(null);
  const [nomeUser, setNomeUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("");
  const [editing, setEditing] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("userData");
        const idFromStorage = raw ? JSON.parse(raw)?.idUser : null;

        if (!idFromStorage) {
          setLoadingProfile(false);
          Alert.alert("Erro", "Não foi possível identificar o usuário logado.");
          return;
        }

        const apiUser = await getUser(idFromStorage);
        setUser(apiUser);
        setNomeUser(apiUser?.nomeUser ?? "");
        setEmail(apiUser?.email ?? "");
        setPhone(apiUser?.phone ?? "");
        setLanguage(apiUser?.language ?? "");
        setTheme(apiUser?.theme ?? "");
      } catch (e) {
        console.warn("Falha ao carregar usuário pela API:", e);
        Alert.alert("Erro", "Não foi possível carregar seus dados.");
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, []);

  async function handleSave() {
    try {
      if (!user) throw new Error("Usuário não carregado");
      const payload = { email, nomeUser, phone };

      await putUser(user.idUser, payload);

      const apiUser = await getUser(user.idUser);
      setUser(apiUser);
      setNomeUser(apiUser?.nomeUser ?? "");
      setEmail(apiUser?.email ?? "");
      setPhone(apiUser?.phone ?? "");

      setEditing(false);
      Alert.alert(
        "Perfil atualizado",
        "Suas informações foram salvas com sucesso."
      );
    } catch (e: any) {
      console.error("Erro ao atualizar perfil:", e);
      const msg = e?.response?.data || e?.message || "";
      if (
        msg.includes("duplicate key value") ||
        msg.includes("usuario_email_key")
      ) {
        setEmailError("Este e-mail já está em uso.");
      } else {
        Alert.alert("Erro", "Não foi possível salvar suas informações.");
      }
    }
  }

  function confirmDelete() {
    if (!user) return;
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => handleDeleteUser(user.idUser),
        },
      ]
    );
  }

  async function handleDeleteUser(id: number) {
    try {
      await deleteUser(id);
      await AsyncStorage.multiRemove(["token", "userData"]);
      Alert.alert("Usuário excluído", "O usuário foi excluído com sucesso.");
      navigation.navigate("Login" as never);
    } catch (e) {
      console.error("Erro ao excluir usuário:", e);
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  }

  const goToSettings = () => {
    navigation.navigate(
      "Themes" as never,
      {
        currentLanguage: language,
        currentTheme: theme,
        onUpdate: (next: { language?: string; theme?: string }) => {
          if (next.language) setLanguage(next.language);
          if (next.theme) setTheme(next.theme);
        },
      } as never
    );
  };

  function handleLogout() {
    Alert.alert("Sair", "Você tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["token", "userData"]);
          navigation.navigate("Login" as never);
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={[styles.container]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text }]}>Meu Perfil</Text>
          {editing ? (
            <TouchableOpacity
              onPress={handleSave}
              style={[
                styles.headerBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <Icon name="content-save" size={scale(18)} color={colors.text} />
              <Text style={[styles.headerBtnText, { color: colors.text }]}>
                Salvar
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setEditing(true)}
              style={[
                styles.headerBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
            >
              <Icon name="pencil" size={scale(18)} color={colors.text} />
              <Text style={[styles.headerBtnText, { color: colors.text }]}>
                Editar
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: StyleSheet.hairlineWidth,
            },
          ]}
        >
          <View style={styles.avatarWrap}>
            <View
              style={[styles.avatarCircle, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.avatarLetter}>
                {nomeUser ? nomeUser.charAt(0).toUpperCase() : "?"}
              </Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text, opacity: 0.7 }]}>
              Nome
            </Text>
            {editing ? (
              <TextInput
                value={nomeUser}
                onChangeText={setNomeUser}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Seu nome"
                placeholderTextColor={colors.text + "99"}
              />
            ) : (
              <Text style={[styles.value, { color: colors.text }]}>
                {nomeUser}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text, opacity: 0.7 }]}>
              Email
            </Text>
            {editing ? (
              <>
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError(null);
                  }}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.card,
                      borderColor: emailError ? "red" : colors.border,
                    },
                  ]}
                  placeholder="seu@email.com"
                  placeholderTextColor={colors.text + "99"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {emailError && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {emailError}
                  </Text>
                )}
              </>
            ) : (
              <Text style={[styles.value, { color: colors.text }]}>
                {email}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text, opacity: 0.7 }]}>
              Telefone
            </Text>
            {editing ? (
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="(00) 00000-0000"
                placeholderTextColor={colors.text + "99"}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={[styles.value, { color: colors.text }]}>
                {phone}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.actions,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={[styles.actionBtn, { borderBottomColor: colors.border }]}
            onPress={goToSettings}
          >
            <Icon name="cog-outline" size={scale(18)} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              Configurações
            </Text>
            <View style={styles.actionRight}>
              <Icon name="chevron-right" size={scale(20)} color={colors.text} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { borderBottomColor: colors.border }]}
            onPress={confirmDelete}
          >
            <Icon name="delete-outline" size={scale(18)} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              Excluir conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: "#EB4435",
                borderBottomWidth: 0,
                justifyContent: "center",
              },
            ]}
            onPress={handleLogout}
          >
            <Icon name="logout" size={scale(18)} color="#fff" />
            <Text style={[styles.actionText, { color: "#fff" }]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: scale(16), gap: verticalScale(16) },
  actionRight: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: scale(20), fontWeight: "800", flex: 1 },
  headerBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    gap: scale(6),
  },
  headerBtnText: { fontSize: scale(14), fontWeight: "600" },
  card: {
    borderRadius: moderateScale(14),
    padding: scale(16),
    gap: verticalScale(12),
  },
  avatarWrap: { alignSelf: "center", marginBottom: verticalScale(8) },
  avatarCircle: {
    width: scale(88),
    height: scale(88),
    borderRadius: moderateScale(44),
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { fontSize: scale(36), fontWeight: "700", color: "#fff" },
  field: { gap: verticalScale(6) },
  label: { fontSize: scale(12), fontWeight: "600" },
  value: { fontSize: scale(16), fontWeight: "700" },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
  },
  actions: {
    borderRadius: moderateScale(12),
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    gap: scale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionText: { fontSize: scale(14), fontWeight: "600" },
});
