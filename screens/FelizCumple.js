import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/generalStyles';
import Cake from '../components/Cake';

export default function FelizCumple({ route }) {
    const { edad } = route.params; 

    return (
        <View style={styles.container} >
            <Text style={[styles.title, styles.textColor]}>
                Feliz cumpleaños! Sopla las velas y pide un deseo
            </Text>
            <Cake edad={edad}/>
        </View >
    )
};