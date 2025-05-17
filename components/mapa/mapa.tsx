import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';

export default function MapaVagas() {
    type TabelaProps = {
    vagasPatio: number;
    vagasManutencao: number;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const totalMotos = 142;
  const numColunas = 8;
  const motos = Array.from({ length: totalMotos }).map((_, index) => ({
    id: index,
    ocupada: Math.random() > 0.5,
  }));
  const previewMotos = motos.slice(0, 24);
  const vagasManutencao = 5;
  const vagasPatio = motos.filter(m => !m.ocupada).length;

  const Tabela = ({ vagasPatio, vagasManutencao }: TabelaProps) => (
    <View style={styles.container}>
      <Text style={styles.label}>Resumo de Vagas</Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Vagas no Pátio: {vagasPatio}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Vagas na Manutenção: {vagasManutencao}</Text>
      <Divider style={styles.divider} />
    </View>
  );

const renderMapa = (motosParaRenderizar: typeof motos) => (
  <View style={[styles.grid, { width: numColunas * 38 }]}>
    {motosParaRenderizar.map((moto, index) => (
      <View key={index} style={styles.vaga}>
        {moto.ocupada && (
          <Icon name="motorbike" size={20} color="green" />
        )}
      </View>
    ))}
  </View>
);
  return (
    <View style={styles.container}>
      <View style={styles.mapaContainer}>
        {renderMapa(previewMotos)}
        <TouchableOpacity
          style={styles.fullscreenButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="arrow-expand" size={20} color="#000" />
        </TouchableOpacity>
      </View>


    <Modal
        visible={modalVisible}
        animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.mapaContainerModal}>
            <Text style={styles.modalTitle}>Mapa Completo</Text>
            <ScrollView
              contentContainerStyle={{ alignItems: 'center' }}
              minimumZoomScale={1}
              maximumZoomScale={3}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bouncesZoom={true}
              centerContent={true}
            >
              {renderMapa(motos)}
              <View style={styles.tableContainer}>
                  <Tabela vagasPatio={vagasPatio} vagasManutencao={vagasManutencao} />
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapaContainer: {
    position: 'relative',
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
    minWidth: 350,
    minHeight: 500,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mapaContainerModal: {
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    backgroundColor: '#ffffffb2',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  vaga: {
    width: 30,
    height: 30,
    margin: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  fullscreenButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#242424',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 30,
    padding: 8,
  },
  tableContainer: {
    backgroundColor: '#fffffff2',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginVertical: 6,
  },
  divider: {
    backgroundColor: '#ccc',
    height: 1,
  },
});
