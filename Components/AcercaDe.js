import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AcercaDe = ({ oficial }) => {
  return (
    <View style={styles.container}>
      <Image source={ oficial.fotoUri } style={styles.image} />
      <Text style={styles.text}>Nombre: {oficial.nombre} {oficial.apellido}</Text>
      <Text style={styles.text}>Matrícula: {oficial.matricula}</Text>
      <Text style={styles.reflection}>{oficial.reflexion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  reflection: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default AcercaDe;
