import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import IncidenciaForm from './Components/IncidenciaForm';
import IncidenciaList from './Components/IncidenciaList';
import IncidenciaDetail from './Components/IncidenciaDetail';
import AcercaDe from './Components/AcercaDe';

import image from "./image/Foto.jpeg"

const oficial = {
  fotoUri: image,
  nombre: 'Jelias',
  apellido: 'Garcia',
  matricula: '2021-0871',
  reflexion: 'La seguridad es primero.',
};

export default function App() {
  const [vista, setVista] = useState('lista');
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);

  const manejarGuardar = () => {
    setVista('lista');
  };

  const manejarSeleccionar = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setVista('detalle');
  };

  const manejarVolver = () => {
    setIncidenciaSeleccionada(null);
    setVista('lista');
  };

  return (
    <View style={styles.container}>
      {vista === 'formulario' && <IncidenciaForm onSave={manejarGuardar} />}
      {vista === 'lista' && <IncidenciaList onSelect={manejarSeleccionar} />}
      {vista === 'detalle' && incidenciaSeleccionada && <IncidenciaDetail incidencia={incidenciaSeleccionada} onBack={manejarVolver} />}
      {vista === 'acerca' && <AcercaDe oficial={oficial} />}
      <View style={styles.botones}>
        <Button title="Registrar Incidencia" onPress={() => setVista('formulario')} />
        <Button title="Ver Incidencias" onPress={() => setVista('lista')} />
        <Button title="Acerca de" onPress={() => setVista('acerca')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
