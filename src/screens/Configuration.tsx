import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from 'react-native-paper';
import Vagas from '../../components/dropdownVgas/vagas';
import Metragem from '../../components/dropdownMetragem/metragem';
import Header from '../../components/header/header';
import Gateways from '../../components/dropdowGateways/gateways';
import { Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';


export default function Search() {

  const [text, setText] = useState('');
  const [showZonas, setShowZonas] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [zonas, setZonas] = useState(['entrada', 'saida', 'centro', 'manutencao']);
    
  const opcoesZona = [
  { label: 'Entrada', value: 'entrada' },
  { label: 'Saida', value: 'saida' },
  { label: 'Centro', value: 'centro' },
  { label: 'Manutenção', value: 'manutencao' },
];

    return (
        <ScrollView style={styles.container}>
            <View  style={styles.container}>

                <Header/>
                <Text style={styles.titlePrinc}>Configure o Patio:</Text>

                <View>

                    <View style={styles.containera}>
                        <Text style={styles.label}>Nome da Filial</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                            style={styles.input}
                            placeholder="Digite o nome da filial"
                            placeholderTextColor="#999"
                            value={text}
                            onChangeText={setText}
                            underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>

                    <View style={styles.containerInput}>
                        <Vagas />

                        <Metragem />
                    </View>

                    <View>
                        <Gateways/>
                    </View>
                </View>

                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="help-outline" size={20} color="green" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Configurar Zonas:</Text>

                        <TouchableOpacity onPress={() => setShowZonas(prev => !prev)}>
                        <MaterialIcons
                            name={showZonas ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                            size={24}
                            color="green"
                        />
                        </TouchableOpacity>
                    </View>

                    {showZonas && (
                        <View style={styles.zonasContainer}>
                        {zonas.map((zonaSelecionada, index) => (
                            <View key={index} style={styles.zonaLinha}>
                            <Text style={styles.zonaLabel}>Zona {index + 1}:</Text>
                            <Dropdown
                                data={opcoesZona}
                                labelField="label"
                                valueField="value"
                                value={zonaSelecionada}
                                onChange={item => {
                                const novaZonas = [...zonas];
                                novaZonas[index] = item.value;
                                setZonas(novaZonas);
                                }}
                                style={styles.dropdown}
                                placeholder=""
                            />
                            </View>
                        ))}
                        </View>
                    )}

                        <Modal
                            visible={modalVisible}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Ajuda - Configurar Zonas</Text>
                                <Text style={styles.modalText}>
                                Você pode configurar até 4 zonas diferentes no pátio. Exemplos: 
                                <Text style={styles.modalTextDestaq}>Entrada, Saída, Centro, Manutenção.</Text>
                                </Text>

                                <Text style={styles.modalText}>Isso permite 
                                <Text style={styles.modalTextDestaq}>rastrear onde cada moto está dentro do pátio em tempo real.</Text>
                                </Text>

                                <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Fechar</Text>
                                </Pressable>
                            </View>
                            </View>
                        </Modal>
                </View>

                <View style={styles.containermap}>
                    <Text style={styles.titlemap}>Visualização:</Text>

                    <Image
                        source={require('../../assets/mapaEx.png')}
                        style={styles.map}/>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#242424',
          paddingBottom: 30,
    },
    map: {
        width: 350,
        height: 350,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
    },
     label: {
    color: '#fff',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 4,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 45,
  },
  input: {
    fontSize: 16,
    backgroundColor: 'transparent',
    marginBottom: 100,
  },
      dropdownContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
  },
  containerInput : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containera: {
    marginRight: 10,
    marginLeft: 10,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 4,
    flex: 1,
    fontWeight: 'bold',
  },
  titlePrinc: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    flex: 1,
  },
  containermap: {
    marginTop: 20,
  },
  titlemap: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
  },
  zonasContainer: {
    marginTop: 10,
    gap: 10,
  },
  zonaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  zonaLabel: {
    color: '#fff',
    fontSize: 14,
    width: 60,
    marginLeft: 40,
  },
  dropdown: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 35,
    marginRight: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#050e06aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#d6d6d6',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalTextDestaq: {
    fontSize: 14,
    marginBottom: 20,
    color: '#459148',
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})