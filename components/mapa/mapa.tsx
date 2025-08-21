import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-paper";

export default function MapaVagas() {
  type TabelaProps = {
    vagasPatio: number;
    vagasManutencao: number;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const totalMotos = 90;
  const totalVagasPatio = 320;
  const motosManutencao = 5;
  const motosPatio = totalMotos - motosManutencao;

  const numColunas = 8;

  const motosZonaA = Array.from({ length: totalVagasPatio }, (_, index) => ({
    id: index,
    ocupada: index < motosPatio,
  }));

  const motosZonaB = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    ocupada: index < motosManutencao,
  }));

  const previewMotosA = motosZonaA.slice(0, 24);
  const previewMotosB = motosZonaB.slice(0, 12);

  const Tabela = ({ vagasPatio, vagasManutencao }: TabelaProps) => (
    <View style={styles.container}>
      <Text style={styles.label}>Resumo de Vagas</Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Motos no Pátio: {vagasPatio}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Motos na Manutenção: {vagasManutencao}</Text>
      <Divider style={styles.divider} />
    </View>
  );

  const renderMapa = (
    titulo: string,
    motosParaRenderizar: typeof motosZonaA,
    corFundo: string
  ) => (
    <View
      style={[
        styles.grid,
        { width: numColunas * 38, backgroundColor: corFundo },
      ]}
    >
      <Text style={styles.subtituloMapa}>{titulo}</Text>
      {motosParaRenderizar.map((moto, index) => (
        <View key={index} style={styles.vaga}>
          {moto.ocupada && <Icon name="motorbike" size={20} color="green" />}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapaContainer}>
        {renderMapa("Zona A - Pátio", previewMotosA, "#ffffffb2")}
        {renderMapa("Zona B - Manutenção", previewMotosB, "#d1e7dd")}
        <TouchableOpacity
          style={styles.fullscreenButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="arrow-expand" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.mapaContainerModal}>
            <Text style={styles.modalTitle}>Mapa Completo</Text>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              {renderMapa("Zona A - Pátio", motosZonaA, "#ffffffb2")}
              {renderMapa("Zona B - Manutenção", motosZonaB, "#d1e7dd")}

              <View style={styles.tableContainer}>
                <Tabela
                  vagasPatio={motosPatio}
                  vagasManutencao={motosManutencao}
                />
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <View>
              <Icon name="close" size={28} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  mapaContainer: {
    position: "relative",
    backgroundColor: "#e0e0e0",
    padding: 20,
    borderRadius: 10,
    minWidth: 350,
    minHeight: 500,
    alignSelf: "center",
    justifyContent: "center",
  },
  mapaContainerModal: {
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subtituloMapa: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  grid: {
    backgroundColor: "#ffffffb2",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  vaga: {
    width: 30,
    height: 30,
    margin: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  fullscreenButton: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#242424",
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#333",
    borderRadius: 30,
    padding: 8,
  },
  tableContainer: {
    backgroundColor: "#fffffff2",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: "100%",
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginVertical: 6,
  },
  divider: {
    backgroundColor: "#ccc",
    height: 1,
  },
});
