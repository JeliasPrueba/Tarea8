import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

const IncidenciaDetail = ({ incidencia, onBack }) => {
  const reproducirAudio = async (uri) => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Error reproduciendo audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{incidencia.titulo}</Text>
      <Text>{incidencia.fecha}</Text>
      <Text>{incidencia.descripcion}</Text>
      {incidencia.fotoUri ? <Image source={{ uri: incidencia.fotoUri }} style={styles.image} /> : null}
      {incidencia.audioUri ? <Button title="Reproducir Audio" onPress={() => reproducirAudio(incidencia.audioUri)} /> : null}
      <Button title="Volver" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default IncidenciaDetail;

