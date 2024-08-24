import React from 'react';
import { ActivityIndicator, StyleSheet, View, Modal } from 'react-native';
import { useLoading } from '../constants/LoadingContext'; // Anpassa sökvägen om det behövs

const LoadingSpinner = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <Modal transparent={true} animationType="none" visible={loading}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ger en semi-transparent bakgrund
    },
});

export default LoadingSpinner;
