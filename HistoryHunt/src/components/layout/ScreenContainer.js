import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerStyles, Spacing } from '../../constants/Theme'; // Se till att sökvägen till din Theme-fil är korrekt

const ScreenContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...ContainerStyles.screenContainer,
        justifyContent: 'center', // Centrerar innehållet vertikalt
        alignItems: 'center', // Centrerar innehållet horisontellt
        paddingTop: Spacing.extraLarge,
        paddingBottom: Spacing.extraLarge,
    },
});

export default ScreenContainer;
