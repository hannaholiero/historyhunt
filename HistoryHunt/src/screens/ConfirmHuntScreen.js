import React from 'react';
import { View, Alert, Text, Image, Button, StyleSheet } from 'react-native';
import MapViewComponent from '../components/MapViewComponent';

const ConfirmHuntScreen = ({ route, navigation }) => {
    const { huntTitle, invitedBy, huntImage, estimatedTime, selectedLocation } = route.params;

    const handleConfirm = () => {
        Alert.alert('Confirmed!', `You have confirmed the hunt: ${huntTitle}`);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CONFIRM HUNT</Text>
            <Text style={styles.subTitle}>Du valde:</Text>
            <View style={styles.huntInfo}>
                <Image source={{ uri: huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
                <View>
                    <Text style={styles.huntTitle}>{huntTitle}</Text>
                    <Text style={styles.huntDetails}>Inbjuden av {invitedBy}</Text>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <MapViewComponent
                    region={{
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    selectedLocation={selectedLocation}
                />
            </View>
            <Text style={styles.estimatedTime}>Estimerad tid: {estimatedTime} minuter</Text>
            <Button title="Confirm!" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    huntInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    huntImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    huntTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    huntDetails: {
        fontSize: 14,
        color: '#555',
    },
    mapContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    estimatedTime: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default ConfirmHuntScreen;
