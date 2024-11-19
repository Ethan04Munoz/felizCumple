import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button } from 'react-native';
import Bienvenida from './screens/Bienvenida';
import FelizCumple from './screens/FelizCumple';
import Deseo from './screens/Deseo';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Bienvenida" component={Bienvenida} options={{ headerShown: false}}/>
                <Stack.Screen name="FelizCumple" component={FelizCumple} options={{ headerShown: false}}/>
                <Stack.Screen name="Deseo" component={Deseo} options={{ headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
