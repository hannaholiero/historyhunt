import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import Button from '../components/CustomButton'; // Använd rätt sökväg till din knappkomponent
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Se till att sökvägen är korrekt
import * as Location from 'expo-location';
import MapViewComponent from '../components/MapViewComponent';

const CreateHuntMapScreen = ({ navigation, route }) => {
    const { huntTitle, estimatedTime, huntImage, huntId } = route.params;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location was denied.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    const handleMapPress = (coordinate) => {
        setSelectedLocation(coordinate);
    };

    const handleCreateHunt = async () => {
        if (!selectedLocation || !huntTitle || !estimatedTime) {
            Alert.alert('Missing Information', 'Please fill in all fields and select a location.');
            return;
        }

        try {
            const newHuntRef = ref(database, `hunts/${huntId}`);
            await set(newHuntRef, {
                huntTitle,
                estimatedTime,
                huntImage,
                location: selectedLocation, // Spara den valda platsen
                participants: [],
                completedBy: [],
            });

            Alert.alert('Success', 'Hunt created successfully!');
            // Skicka med platsen till nästa skärm
            navigation.navigate('ConfirmHuntScreen', { huntId, huntTitle, estimatedTime, huntImage, selectedLocation });
        } catch (error) {
            console.error('Error creating hunt:', error);
            Alert.alert('Error', 'An error occurred while creating the hunt.');
        }
    };

    return (
        <View style={styles.container}>
            {region && (
                <MapViewComponent
                    region={region}
                    selectedLocation={selectedLocation}
                    onMarkerPress={handleMapPress}
                />
            )}
            <View style={styles.buttonContainer}>
                <Button title="Create Hunt" onPress={handleCreateHunt} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
});

export default CreateHuntMapScreen;

// AIzaSyAdrrWYJiONS1DQpS09IutwMqdu9cGKJBg