import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Bienvenida from './screens/Bienvenida';
import FelizCumple from './screens/FelizCumple';
import Deseo from './screens/Deseo';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const backAction = () => {
      // Confirmar antes de cerrar la app
      Alert.alert('Salir', '¿Estás seguro de que quieres salir?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true; // Impide la acción por defecto (navegar hacia atrás)
    };

    // Agregar el listener para el botón de retroceso
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Limpiar el listener al desmontar el componente
    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bienvenida"
          component={Bienvenida}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FelizCumple"
          component={FelizCumple}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Deseo"
          component={Deseo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
