import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/header";
import { AppContext } from "../../App";
import { APP_COLORS } from "../colors/colors";

const Themes = () => {
  const navigation = useNavigation<any>();
  const { value, setValue } = useContext(AppContext);
  const { colors } = useTheme();

  const [theme, setTheme] = useState<number>(Number(value) || 0);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      const storedCategory = await AsyncStorage.getItem("category");
      if (storedTheme !== null) setTheme(Number(storedTheme));
      if (storedCategory !== null) setCategory(storedCategory);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("theme", String(theme));
    setValue(String(theme));
  }, [theme, setValue]);

  useEffect(() => {
    AsyncStorage.setItem("category", category);
  }, [category]);

  const safeIndex = Math.min(Math.max(theme, 0), APP_COLORS.length - 1);

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["left", "right"]}
    >
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Header />

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text }]}>Ajustes</Text>
            <TouchableOpacity
              style={[
                styles.btnGhost,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: StyleSheet.hairlineWidth,
                },
              ]}
              onPress={() =>
                navigation.navigate(
                  "MainTabs" as never,
                  { screen: "Account", params: { screen: "Profile" } } as never
                )
              }
            >
              <Text style={[styles.btnGhostTxt, { color: colors.text }]}>
                Voltar ao Perfil
              </Text>
            </TouchableOpacity>
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
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Tema
              </Text>
              <View
                style={[
                  styles.colorDot,
                  {
                    backgroundColor: APP_COLORS[safeIndex],
                    borderColor: colors.border,
                  },
                ]}
              />
            </View>

            <Text
              style={[styles.sectionHelp, { color: colors.text, opacity: 0.7 }]}
            >
              Escolha entre tema claro ou escuro.
            </Text>

            <SegmentedControl
              style={styles.segment}
              values={["Claro", "Escuro"]}
              selectedIndex={safeIndex}
              tintColor={colors.primary}
              backgroundColor={colors.border}
              fontStyle={{ color: colors.text }}
              activeFontStyle={{ color: "#fff", fontWeight: "700" }}
              onChange={(e) => setTheme(e.nativeEvent.selectedSegmentIndex)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Themes;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  screen: { flex: 1 },
  content: { flex: 1, padding: 16 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: "800", textAlign: "left", flex: 1 },
  card: { borderRadius: 14, padding: 14, marginTop: 12 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: "700", flex: 1 },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionHelp: { fontSize: 12, marginBottom: 10 },
  segment: { marginBottom: 6 },
  btnGhost: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12 },
  btnGhostTxt: { fontWeight: "800" },
});
