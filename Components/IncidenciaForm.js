import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Audio from 'expo-av';
import { guardarIncidencia } from '../utils/storage';

const IncidenciaForm = ({ onSave }) => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fotoUri, setFotoUri] = useState('');
  const [audioUri, setAudioUri] = useState('');

  const seleccionarImagen = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!resultado.canceled) {
      setFotoUri(resultado.assets[0].uri);
    }
  };

  const grabarAudio = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('¡Permiso para acceder al micrófono es necesario!');
      return;
    }
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
      }, 5000); // Grabar por 5 segundos
    } catch (error) {
      console.error('Error grabando audio:', error);
    }
  };

  const manejarGuardar = async () => {
    const incidencia = {
      id: Date.now().toString(),
      titulo,
      fecha,
      descripcion,
      fotoUri,
      audioUri,
    };
    await guardarIncidencia(incidencia);
    onSave();
    setTitulo('');
    setFecha('');
    setDescripcion('');
    setFotoUri('');
    setAudioUri('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Seleccionar Foto" onPress={seleccionarImagen} />
      <Button title="Grabar Audio (5s)" onPress={grabarAudio} />
      <Button title="Guardar Incidencia" onPress={manejarGuardar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default IncidenciaForm;
