import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/styles';

const MedalItem = ({ title }) => (
    <View style={styles.medalItem}>
        <Image
            source={{ uri: 'https://example.com/medal.png' }}
            style={styles.medalImage}
        />
        <Text style={styles.medalTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    medalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.primary100,
        borderRadius: 8,
        marginBottom: 10,
    },
    medalImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    medalTitle: {
        color: Colors.primary800,
        fontWeight: 'bold',
    },
});

export default MedalItem;
