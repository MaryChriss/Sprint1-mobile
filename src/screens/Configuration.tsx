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
import MapaVagas from "../../components/mapa/mapa";


export default function Search() {

  const [text, setText] = useState('');

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
                            underlineColor="transparent"
                            activeOutlineColor="#fff"
                            outlineColor="#fff"
                            mode="outlined"
                            theme={{ colors: { text: '#000', background: '#fff' } }}
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

                <View style={styles.containermap}>
                <Text style={styles.titlemap}>Visualização:</Text>
                <MapaVagas />
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
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
     height: 40,
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