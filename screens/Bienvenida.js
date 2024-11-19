import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Bienvenida({navigation}) {
    const [inputText, setInputText] = useState('');

    function handleButtonPress() {
        navigation.navigate('FelizCumple', { userText: inputText });
    };

    return (
        <View style={styles.container} >
            <Text style={styles.text}>
                ¿Cuántos años cumples?
            </Text>
            <TextInput
                placeholder="Escribe algo aquí..."
                value={inputText}
                onChangeText={text => setInputText(text)}
            />
            <Button title='Festejar!' onPress={handleButtonPress}/>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 18,
        color: '#000',
    },
});
