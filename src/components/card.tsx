import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CardVeiculoProps {
  placa: string;
  local: string;
}

export default function CardVeiculo({ placa, local }: CardVeiculoProps) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/moto.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.cardText}>Placa: {placa}</Text>
        <Text style={styles.cardText}>Local: {local}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
    height: 100,
  },

  image: {
    width: 130,
    height: 130,
    marginRight: 10,
  },

  cardText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 15,
  },
});
