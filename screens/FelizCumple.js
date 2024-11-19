import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/generalStyles';

export default function FelizCumple({ route }) {
    const { userText } = route.params; 

    return (
        <View style={styles.container} >
            <Text style={styles.text}>
                Feliz cumpleaños! Sopla las velas y pide un deseo {userText}
            </Text>
        </View >
    )
};