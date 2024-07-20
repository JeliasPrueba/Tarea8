import AsyncStorage from '@react-native-async-storage/async-storage';

const INCIDENCIAS_KEY = 'incidencias';

export const guardarIncidencia = async (incidencia) => {
  try {
    const incidencias = await obtenerIncidencias();
    incidencias.push(incidencia);
    await AsyncStorage.setItem(INCIDENCIAS_KEY, JSON.stringify(incidencias));
  } catch (error) {
    console.error('Error guardando incidencia:', error);
  }
};

export const obtenerIncidencias = async () => {
  try {
    const incidencias = await AsyncStorage.getItem(INCIDENCIAS_KEY);
    return incidencias ? JSON.parse(incidencias) : [];
  } catch (error) {
    console.error('Error obteniendo incidencias:', error);
    return [];
  }
};

export const eliminarIncidencia = async (index) => {
  try {
    const incidencias = await obtenerIncidencias();
    incidencias.splice(index, 1);
    await AsyncStorage.setItem('incidencias', JSON.stringify(incidencias));
  } catch (error) {
    console.error('Error al eliminar incidencia:', error);
  }
};

export const borrarTodo = async () => {
  try {
    await AsyncStorage.removeItem('incidencias');
  } catch (error) {
    console.error('Error al borrar todas las incidencias:', error);
  }
};
