// MapaVagas.tsx
import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';

export default function MapaVagas() {
  const [modalVisible, setModalVisible] = useState(false);

  const numLinhas = 8;
  const numColunas = 6;

  const motos = Array(numLinhas * numColunas).fill(0).map((_, index) => ({
  id: index,
  ocupada: Math.random() > 0.5,
}));


  
type TabelaProps = {
  vagasPatio: number;
  vagasManutencao: number;
};

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

const patioMotos = motos.slice(0, 24);
const vagasPatio = patioMotos.filter(m => !m.ocupada).length;
const vagasManutencao = 5;
 

  const renderMapa = () => (
    <View style={styles.grid}>
      {motos.map((moto, index) => (
        <View
          key={index}
          style={styles.vaga}
        >
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
        {renderMapa()}

        <TouchableOpacity
          style={styles.fullscreenButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="arrow-expand" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Modal em tela cheia */}
      <Modal
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>

            <View style={styles.mapaContainerModal}>
                <Text style={styles.modalTitle}>Mapa Completo</Text>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {renderMapa()}
                </ScrollView>

                <View style={styles.tableContainer}>
                <Tabela vagasPatio={vagasPatio} vagasManutencao={vagasManutencao} />
                </View>


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
    width: 350,
    height: 500,
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
