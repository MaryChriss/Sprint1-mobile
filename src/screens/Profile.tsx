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
import { putUser } from "../services/rotes";

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
  const [nomeUser, setnomeUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("");
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation<any>();
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("userData");
        if (raw) {
          const u: Partial<UserData> = JSON.parse(raw);
          if (u.nomeUser) setnomeUser(u.nomeUser);
          if (u.email) setEmail(u.email);
          if (u.phone) setPhone(u.phone);
          if (u.language) setLanguage(u.language);
          if (u.theme) setTheme(u.theme);
        }
      } catch (e) {
        console.warn("Falha ao carregar userData:", e);
      }
    })();
  }, []);



const saveUserData = async (data: UserData) => {
  await AsyncStorage.setItem("userData", JSON.stringify(data));
};


async function handleSave() {
  try {
    const raw = await AsyncStorage.getItem("userData");
    if (!raw) throw new Error("Usuário não encontrado no storage");

    const stored: UserData = JSON.parse(raw);

    const payload = {
      email,
      nomeUser,
      phone,
    };

    const updated = await putUser(stored.idUser, payload);

    // atualiza storage
    await saveUserData(updated);

    // atualiza estado local
    setnomeUser(updated.nomeUser);
    setEmail(updated.email);
    setPhone(updated.phone);

    setEditing(false);
    Alert.alert("Perfil atualizado", "Suas informações foram salvas com sucesso.");
  } catch (e: any) {
  console.error("Erro ao atualizar perfil:", e);

  const msg = e?.response?.data || e?.message || "";
  if (msg.includes("duplicate key value") || msg.includes("usuario_email_key")) {
    setEmailError("Este e-mail já está em uso.");
  } else {
    Alert.alert("Erro", "Não foi possível salvar suas informações.");
  }
}
}
  const goToSettings = () => {
    navigation.navigate(
      "Themes" as never,
      {
        currentLanguage: language,
        currentTheme: theme,
        onUpdate: async (next: { language?: string; theme?: string }) => {
          if (next.language) setLanguage(next.language);
          if (next.theme) setTheme(next.theme);
          await saveUserData(next);
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

          {/* Nome */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text, opacity: 0.7 }]}>
              Nome
            </Text>
            {editing ? (
              <TextInput
                value={nomeUser}
                onChangeText={setnomeUser}
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
              <Text style={[styles.value, { color: colors.text }]}>{nomeUser}</Text>
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
    <Text style={[styles.value, { color: colors.text }]}>{email}</Text>
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
              <Text
                style={[
                  styles.actionHint,
                  { color: colors.text, opacity: 0.6 },
                ]}
              >
              </Text>
              <Icon name="chevron-right" size={scale(20)} color={colors.text} />
            </View>
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
  actionHint: { fontSize: scale(12), fontWeight: "600" },
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
