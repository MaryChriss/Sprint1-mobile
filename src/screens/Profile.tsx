import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default function Profile() {
  const [name, setName] = useState("Gabriela Souza");
  const [email, setEmail] = useState("gabi@futurestack.com");
  const [phone, setPhone] = useState("(11) 99999-0000");
  const [editing, setEditing] = useState(false);

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
            <Image
              source={{ uri: "https://i.pravatar.cc/200?img=5" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.avatarBtn}>
              <Icon name="camera" size={scale(16)} color="#111" />
            </TouchableOpacity>
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
          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="bell-outline" size={scale(18)} color="#111" />
            <Text style={styles.actionText}>Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="shield-check-outline" size={scale(18)} color="#111" />
            <Text style={styles.actionText}>Privacidade</Text>
          </TouchableOpacity>

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

const CARD_BG = "#fff";
const BORDER = "#E5E7EB";
const TEXT = "#111827";
const MUTED = "#6B7280";
const BADGE = "#F3F4F6";
const PRIMARY = "#EB4435";

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    gap: verticalScale(16),
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: scale(20),
    fontWeight: "800",
    color: TEXT,
    flex: 1,
  },
  headerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BADGE,
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
    backgroundColor: CARD_BG,
    borderRadius: moderateScale(14),
    padding: scale(16),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
    gap: verticalScale(12),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: scale(8),
    shadowOffset: { width: 0, height: verticalScale(2) },
    elevation: 2,
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
    backgroundColor: BADGE,
    borderRadius: moderateScale(16),
    padding: scale(6),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
  },

  field: {
    gap: verticalScale(6),
  },
  label: {
    fontSize: scale(12),
    color: MUTED,
    fontWeight: "600",
  },
  value: {
    fontSize: scale(16),
    color: TEXT,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    color: TEXT,
  },
  statsRow: {
    flexDirection: "row",
    gap: scale(12),
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
    alignItems: "center",
  },
  statNumber: {
    fontSize: scale(18),
    fontWeight: "800",
    color: TEXT,
  },
  statLabel: {
    marginTop: verticalScale(4),
    fontSize: scale(12),
    color: MUTED,
  },
  actions: {
    backgroundColor: CARD_BG,
    borderRadius: moderateScale(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
    overflow: "hidden",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    gap: scale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  actionText: {
    fontSize: scale(14),
    color: TEXT,
    fontWeight: "600",
  },
  dangerBtn: {
    backgroundColor: PRIMARY,
    borderBottomWidth: 0,
    justifyContent: "center",
  },
});
