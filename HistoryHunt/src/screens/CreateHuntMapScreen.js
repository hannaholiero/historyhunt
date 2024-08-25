import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import Button from '../components/common/Button';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateHuntMapScreen = ({ navigation, route }) => {
    const { hunt } = route.params;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

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
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    const handleMapPress = (event) => {
        const coordinate = event.nativeEvent.coordinate;
        setSelectedLocation(coordinate);
    };

    const handleCreateHunt = async () => {
        if (!selectedLocation) {
            Alert.alert('Missing Information', 'Please select a location on the map.');
            return;
        }

        try {
            const updatedHuntData = {
                ...hunt,
                location: selectedLocation,
            };

            const newHuntRef = ref(database, `hunts/${hunt.huntId}`);
            await set(newHuntRef, updatedHuntData);

            // Uppdatera användarens plannedHunts med platsen
            const userId = await AsyncStorage.getItem('userId');
            const userPlannedHuntsRef = ref(database, `users/${userId}/plannedHunts/${hunt.huntId}`);
            await set(userPlannedHuntsRef, updatedHuntData);

            Alert.alert('Success', 'Hunt created successfully!');
            navigation.navigate('InvitePlayers', {
                hunt: updatedHuntData,
                userLocation,  // Skicka med användarens plats
            });
        } catch (error) {
            console.error('Error creating hunt:', error);
            Alert.alert('Error', 'An error occurred while creating the hunt.');
        }
    };

    return (
        <View style={styles.container}>
            {region && (
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation={true} // Visa användarens nuvarande position med blå pricken
                    onPress={handleMapPress}
                >
                    {selectedLocation && (
                        <Marker coordinate={selectedLocation} />
                    )}
                </MapView>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Set Location & Continue" onPress={handleCreateHunt} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        padding: 20,
    },
});

export default CreateHuntMapScreen;
