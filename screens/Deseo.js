import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/generalStyles';

export default function Deseo() {
    return (
        <View style={styles.container} >
            <Text style={[styles.title, styles.textColor]}>
                ¡Que buen deseo!
            </Text>
            <Text style={[styles.title, styles.textColor]}>
                Tu amigo Ethan te desea un feliz cumpleaños
            </Text>
        </View >
    )
};