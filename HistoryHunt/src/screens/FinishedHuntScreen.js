import React, { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { ref, remove, set } from 'firebase/database';  // Korrekt import av set
import { database } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { ScreenLayout, Card } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';
import CustomButton from '../components/common/Button';

const FinishedHuntScreen = ({ route, navigation }) => {
    const { hunt, photoUri } = route.params;

    useEffect(() => {
        console.log("Received hunt in FinishedHuntScreen:", hunt);
        console.log("Received photoUri in FinishedHuntScreen:", photoUri);
    }, [hunt, photoUri]);

    const handleCompleteHunt = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');

            if (!hunt || !hunt.huntId || !userId) {
                Alert.alert('Error', 'Hunt or User data is missing.');
                return;
            }

            // Ta bort jakten från plannedHunts och activeHunts
            const plannedHuntsRef = ref(database, `users/${userId}/plannedHunts/${hunt.huntId}`);
            const activeHuntsRef = ref(database, `users/${userId}/activeHunts/${hunt.huntId}`);
            await remove(plannedHuntsRef);
            await remove(activeHuntsRef);

            // Lägg till jakten i completedHunts
            const completedHuntData = {
                ...hunt,
                photoUri, // Spara den tagna bilden
            };
            const completedHuntsRef = ref(database, `users/${userId}/completedHunts/${hunt.huntId}`);
            await set(completedHuntsRef, completedHuntData);

            Alert.alert('Success', 'Hunt completed successfully!');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error completing hunt:', error);
            Alert.alert('Error', 'An error occurred while completing the hunt.');
        }
    };

    return (
        <ScreenLayout title="GRATTIS!">
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: hunt.location.latitude,
                    longitude: hunt.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={hunt.location}
                    title={hunt.huntTitle}
                />
            </MapView>
            <Text style={styles.congratsText}>Du klarade hunten!</Text>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
            <CustomButton title="Slutför" onPress={handleCompleteHunt} />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        height: 300,
        width: '100%',
    },
    congratsText: {
        fontSize: 24,
        marginVertical: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});

export default FinishedHuntScreen;
