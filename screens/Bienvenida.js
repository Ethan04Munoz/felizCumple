import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/generalStyles';

export default function Bienvenida({ navigation }) {
    const [edad, setEdad] = useState('');

    function handleButtonPress() {
        navigation.navigate('FelizCumple', { edad: edad });
    };

    function determinateButtonClasses(){
        if(edad.trim() === ''){
            console.log('Desabilitado', [styles.button, styles.buttonDisabled])
            return [styles.button, styles.buttonDisabled];
        } else {
            console.log('Habilitado', [styles.button, styles.buttonEnabled])
            return [styles.button, styles.buttonEnabled];
        }
    }

    return (
        <View style={styles.container} >
            <Text style={[styles.title, styles.textColor]}>
                ¿Cuántos años cumples?
            </Text>
            <TextInput
                placeholder="18..."
                placeholderTextColor={'#b9b9b9'}
                value={edad}
                onChangeText={text => setEdad(text)}
                style={[styles.textColor, styles.input]}
                keyboardType='numeric'
                maxLength={3}
            />
            <TouchableOpacity style={determinateButtonClasses()} onPress={handleButtonPress} disabled={edad.trim() === ''}>
                <Text style={[styles.buttonText, styles.textColor]}>Festejar!</Text>
            </TouchableOpacity>

        </View >
    )
};