import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

interface CardVeiculoProps {
  placa: string;
  local: string;
}

export default function CardVeiculo({ placa, local }: CardVeiculoProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
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
      <Image
        source={require("../../assets/moto.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={[styles.cardText, { color: colors.text }]}>
          {t("placa")} {placa}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          {t("local")} {local}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
    height: 100,
  },
  image: { width: 130, height: 130, marginRight: 10 },
  cardText: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
});
