import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [name, setName] = useState("Gabriela Souza");
  const [email, setEmail] = useState("gabi@futurestack.com");
  const [phone, setPhone] = useState("(11) 99999-0000");
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation<any>();

  const [language, setLanguage] = useState("Português");
  const [theme, setTheme] = useState("Claro");

  function handleSave() {
    setEditing(false);
    Alert.alert(
      "Perfil atualizado",
      "Suas informações foram salvas com sucesso."
    );
  }

  function handleLogout() {
    Alert.alert("Sair", "Você tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          //logout
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Meu Perfil</Text>
          {editing ? (
            <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
              <Icon name="content-save" size={scale(18)} color="#111" />
              <Text style={styles.headerBtnText}>Salvar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setEditing(true)}
              style={styles.headerBtn}
            >
              <Icon name="pencil" size={scale(18)} color="#111" />
              <Text style={styles.headerBtnText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {name ? name.charAt(0).toUpperCase() : "?"}
              </Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Nome</Text>
            {editing ? (
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Seu nome"
              />
            ) : (
              <Text style={styles.value}>{name}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            {editing ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{email}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Telefone</Text>
            {editing ? (
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{phone}</Text>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate("Chatbot")}
          >
            <Icon
              name="message-question-outline"
              size={scale(18)}
              color="#111"
            />
            <Text style={styles.actionText}>Precisa de ajuda</Text>

            <View style={styles.actionRight}>
              <Text style={styles.actionHint}>Chatbot</Text>
              <Icon name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              navigation.navigate(
                "Settings" as never,
                {
                  currentLanguage: language,
                  currentTheme: theme,
                  onUpdate: (next: { language?: string; theme?: string }) => {
                    if (next.language) setLanguage(next.language);
                    if (next.theme) setTheme(next.theme);
                  },
                } as never
              )
            }
          >
            <Icon name="cog-outline" size={scale(18)} color="#111" />
            <Text style={styles.actionText}>Configurações</Text>

            <View style={styles.actionRight}>
              <Text style={styles.actionHint}>
                {language} • {theme}
              </Text>
              <Icon name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Sair */}
          <TouchableOpacity
            style={[styles.actionBtn, styles.dangerBtn]}
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
  container: {
    padding: scale(16),
    gap: verticalScale(16),
  },
  actionRight: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  actionHint: {
    fontSize: scale(12),
    color: "#6B7280",
    fontWeight: "600",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#111827",
    flex: 1,
  },
  headerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    gap: scale(6),
  },
  headerBtnText: {
    fontSize: scale(14),
    color: "#111",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: scale(16),
    gap: verticalScale(12),
  },

  avatarWrap: {
    alignSelf: "center",
    marginBottom: verticalScale(8),
  },
  avatar: {
    width: scale(88),
    height: scale(88),
    borderRadius: moderateScale(48),
  },
  avatarBtn: {
    position: "absolute",
    bottom: 0,
    right: -scale(6),
    backgroundColor: "#F3F4F6",
    borderRadius: moderateScale(16),
    padding: scale(6),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },

  field: {
    gap: verticalScale(6),
  },
  label: {
    fontSize: scale(12),
    color: "#6B7280",
    fontWeight: "600",
  },
  value: {
    fontSize: scale(16),
    color: "#111827",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    gap: scale(12),
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  statNumber: {
    fontSize: scale(18),
    fontWeight: "800",
    color: "#111827",
  },
  statLabel: {
    marginTop: verticalScale(4),
    fontSize: scale(12),
    color: "#6B7280",
  },
  actions: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  avatarCircle: {
    width: scale(88),
    height: scale(88),
    borderRadius: moderateScale(44),
    backgroundColor: "#2E9936", // cor de fundo padrão do avatar
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontSize: scale(36),
    fontWeight: "700",
    color: "#fff", // letra branca sobre fundo verde
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    gap: scale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  actionText: {
    fontSize: scale(14),
    color: "#111827",
    fontWeight: "600",
  },
  dangerBtn: {
    backgroundColor: "#EB4435",
    borderBottomWidth: 0,
    justifyContent: "center",
  },
});
