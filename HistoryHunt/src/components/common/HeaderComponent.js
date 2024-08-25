import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Spacing } from '../../constants/Theme'; // Se till att sökvägen till din Theme-fil är korrekt

const HeaderComponent = ({ title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: Spacing.large,
    },
    title: {
        ...Typography.header1,
        textAlign: 'center',
    },
    subtitle: {
        ...Typography.header2,
        textAlign: 'center',
        marginTop: Spacing.small,
    },
});

export default HeaderComponent;
