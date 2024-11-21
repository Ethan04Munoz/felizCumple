import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { styles } from '../styles/cake';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import * as FileSystem from 'expo-file-system';
import SoundLevel from 'react-native-sound-level';
import { Audio } from 'expo-av';

const Cake = ({ edad }) => {
    const flameOpacity = new Animated.Value(1);  // Valor inicial de opacidad

    const [flamesVisible, setFlamesVisible] = useState(true);  // Para controlar si las llamas están encendidas

    // Iniciar la animación de parpadeo
    const startFlicker = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(flameOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(flameOpacity, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    // Función que simula apagar las velas
    const blowCandles = () => {
        setFlamesVisible(false);  // Apaga las velas
        Animated.timing(flameOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Función que maneja la detección del soplido
    const handleSoundDetection = async () => {
        console.log('Entro a handleSoundDetection');

        // Solicitar permisos de micrófono si es necesario (solo en Android)
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Microphone Permission',
                        message: 'We need access to your microphone to detect the blow.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permission to record audio denied');
                    return;
                }
                if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permisos concedidos');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            console.log("Platform OS: ", Platform.OS);
        }

        console.log('Antes de iniciar el sonido')
        // Inicia la grabación
    };

    useEffect(() => {
        console.log('UseEffect en Cake.js')
        startFlicker(); // Iniciar la animación de las llamas
        handleSoundDetection(); // Comienza a detectar el sonido del micrófono
    }, []);

    // Crear un arreglo de velas basado en la edad
    const candles = Array.from({ length: edad }, (_, index) => (
        <View key={index} style={styles.candle}>
            {flamesVisible && (
                <Animated.View
                    style={[styles.candleFlame, { opacity: flameOpacity }]} // Aplicando la animación de opacidad
                />
            )}
        </View>
    ));

    return (
        <View style={styles.cake}>
            <View style={styles.candles}>
                {candles} {/* Renderiza las velas basadas en la edad */}
            </View>

            <View style={[styles.layer, styles.top, styles.top1]}></View>
            <View style={[styles.layer, styles.top, styles.top2]}></View>
            <View style={[styles.layer, styles.middle]}></View>
            <View style={[styles.layer, styles.middle]}></View>
            <View style={[styles.layer, styles.bottom]}></View>
            <View style={[styles.layer, styles.bottom]}></View>
            {!flamesVisible && <Text style={styles.spoiledText}>¡Las velas se apagaron!</Text>}
        </View>
    );
};
export default Cake;