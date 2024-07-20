import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { obtenerIncidencias, eliminarIncidencia } from '../utils/storage';

const IncidenciaList = ({ onSelect }) => {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const cargarIncidencias = async () => {
      const data = await obtenerIncidencias();
      setIncidencias(data);
    };
    cargarIncidencias();
  }, [incidencias]);

  const handleEliminar = async (index) => {
    await eliminarIncidencia(index);
    const data = await obtenerIncidencias();
    setIncidencias(data);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text onPress={() => onSelect(item)}>{item.titulo}</Text>
      <Button title="Eliminar" onPress={() => handleEliminar(index)} />
    </View>
  );

  return (
    <FlatList
      data={incidencias}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default IncidenciaList;
