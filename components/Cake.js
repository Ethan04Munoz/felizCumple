import React, { useEffect, useState } from 'react';
import { View, Animated, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import { styles } from '../styles/cake';
import { Audio } from 'expo-av';

const Cake = ({ edad, navigation }) => {
    const flameOpacity = new Animated.Value(0.8);  // Valor inicial de opacidad

    const [flamesVisible, setFlamesVisible] = useState(true);  // Para controlar si las llamas están encendidas
    const [micPermission, setMicPermission] = useState(false); // Para controlar el permiso del micrófono

    const [recording, setRecording] = useState(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    async function startRecording() {
        if (recording) {
            console.log("Ya hay una grabación activa. Esperando a que termine.");
            return;
        }
    
        try {
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started', recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (!recording) {
            console.log('No hay grabación activa para detener.');
            return;
        }

        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }

    // Umbral de volumen para detectar el soplido
    const volumeThreshold = -1;

    // Iniciar la animación de parpadeo
    const startFlicker = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(flameOpacity, {
                    toValue: 0.8,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(flameOpacity, {
                    toValue: 0.4,
                    duration: 600,
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
            duration: 900,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            navigation.navigate('Deseo', { edad: edad });
        }, 500);
    };

    // Función que maneja la detección del soplido
    const handleSoundDetection = async () => {
        if (!micPermission) {
            console.log('Esperando permisos de micrófono...');
            return;
        }
        console.log('Iniciando detección de sonido...');
        try {
            console.log('Antes de iniciar deteccion');
            await startRecording();
            const checkVolume = setInterval(async () => {
                const status = await recording.getStatusAsync();
                console.log('Nivel de volumen:', status.metering);

                if (status.metering >= volumeThreshold) {
                    console.log('¡Soplo detectado!');
                    blowCandles(); // Apaga las velas
                    clearInterval(checkVolume); // Detén el monitoreo
                    await stopRecording(); // Detén la grabación
                }
            }, 200); // Verifica el nivel de volumen cada 200 ms
        } catch (err) {
            console.error('Error al detectar el sonido:', err);
        }
    };

    // Solicitar permisos de micrófono cuando se monte el componente
    useEffect(() => {
        const requestMicPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    console.log('Solicitando permisos para el micrófono...');
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        {
                            title: 'Permiso de micrófono',
                            message: 'Necesitamos acceso a tu micrófono , por favor.',
                            buttonNeutral: 'Pregúntame luego',
                            buttonNegative: 'Cancelar',
                            buttonPositive: 'Aceptar',
                        }
                    );

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Permisos concedidos');
                        setMicPermission(true);
                    } else {
                        console.log('Permiso para grabar audio denegado');
                        Alert.alert('Permiso Denegado', 'No podemos acceder al micrófono sin tu permiso.');
                    }
                } catch (err) {
                    console.warn('Error al solicitar permisos:', err);
                    Alert.alert('Error', 'Hubo un problema al solicitar los permisos. Intenta nuevamente.');
                }
            } else {
                console.log('No es Android, concediendo permisos automáticamente.');
                setMicPermission(true); 
            }
        };

        requestMicPermission();
    }, []);

    useEffect(() => {
        if (!flamesVisible) {
            console.log("Llamas no visibles, deteniendo ejecución del efecto.");
            return; // Detener ejecución si flamesVisible es false, pues indica que las velas estan apagadas
        }
    
        console.log("Valores: ", micPermission, recording);
        if (micPermission) {
            console.log('Permiso concedido, iniciando animación y detección de sonido');
            startFlicker(); // Iniciar la animación de las llamas
            handleSoundDetection(); 
        } else {
            console.log('Esperando para obtener permisos...');
        }
    }, [micPermission, permissionResponse, recording, flamesVisible]);
    

    // Crear un arreglo de velas basado en la edad
    const candles = Array.from({ length: edad }, (_, index) => (
        <View key={index} style={styles.candle}>
            {flamesVisible && (
                <Animated.View
                    style={[styles.candleFlame, { opacity: flameOpacity }]}
                />
            )}
        </View>
    ));

    return (
        <View style={styles.cake}>
            <View style={styles.candles}>
                {candles}
            </View>

            <View style={[styles.layer, styles.top, styles.top1]}></View>
            <View style={[styles.layer, styles.top, styles.top2]}></View>
            <View style={[styles.layer, styles.middle]}></View>
            <View style={[styles.layer, styles.middle]}></View>
            <View style={[styles.layer, styles.bottom]}></View>
            <View style={[styles.layer, styles.bottom]}></View>
        </View>
    );
};

export default Cake;