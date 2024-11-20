import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { styles } from '../styles/cake';

const Cake = ({ edad }) => {
    const flameOpacity = new Animated.Value(1);  // Valor inicial de opacidad

    // Función para iniciar la animación de parpadeo
    const startFlicker = () => {
        Animated.loop(
            Animated.sequence([
                // Aumentar la opacidad (fuego visible)
                Animated.timing(flameOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                // Disminuir la opacidad (fuego invisible)
                Animated.timing(flameOpacity, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start(); // Iniciar la animación en bucle
    };

    useEffect(() => {
        startFlicker(); // Comienza el parpadeo cuando el componente se monta
    }, []);

    // Crear un arreglo de velas basado en la edad
    const candles = Array.from({ length: edad }, (_, index) => (
        <View key={index} style={styles.candle}>
            <Animated.View
                style={[styles.candleFlame, { opacity: flameOpacity }]} // Aplicando la animación de opacidad
            />
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
        </View>
    );
};
export default Cake;