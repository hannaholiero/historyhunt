import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

const HuntItem = ({ title }) => (
    <View style={styles.huntItem}>
        <Text style={styles.huntTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    huntItem: {
        padding: 10,
        backgroundColor: Colors.primary100,
        borderRadius: 8,
        marginBottom: 10,
    },
    huntTitle: {
        color: Colors.primary800,
        fontWeight: 'bold',
    },
});

export default HuntItem;
