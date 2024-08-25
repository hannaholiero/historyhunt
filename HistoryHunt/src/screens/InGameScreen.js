import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Button from '../components/common/Button';
import { ref, push, update } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { ScreenLayout } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

const InGameScreen = ({ route, navigation }) => {
    const { hunt, photoUri } = route.params;
    const [userLocation, setUserLocation] = useState(null);
    const [photos, setPhotos] = useState(photoUri ? [photoUri] : []);
    const [missionCompleted, setMissionCompleted] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Följ användarens rörelse i realtid
            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (newLocation) => {
                    setUserLocation({
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                    });
                }
            );
        })();
    }, []);

    const handleCompleteMission = async () => {
        if (!missionCompleted) {
            try {
                setMissionCompleted(true);

                const timestamp = new Date().toISOString();
                const firstname = await AsyncStorage.getItem('firstname');
                const huntId = hunt.huntId;

                if (!huntId) {
                    Alert.alert('Error', 'Hunt ID is missing.');
                    return;
                }

                for (const photoUri of photos) {
                    const newPhotoRef = push(ref(database, `hunts/${huntId}/photos`));
                    await update(newPhotoRef, {
                        user: firstname,
                        timestamp,
                        photoUri,
                        location: hunt.location,
                    });
                }

                Alert.alert("Mission Completed", "Congratulations! You've completed the mission.");

                navigation.navigate('FinishGame', {
                    hunt: { ...hunt, huntId },
                    photoUri: photos[0],
                });
            } catch (error) {
                console.error("Error saving mission data:", error);
                Alert.alert("Error", "There was a problem saving the mission data. Please try again.");
            }
        }
    };

    const takeImageHandler = () => {
        navigation.navigate('TakePhoto', { hunt });
    };

    return (
        <ScreenLayout title="In Game">
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: hunt.location.latitude,
                    longitude: hunt.location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
            >
                {userLocation && (
                    <Polyline
                        coordinates={[
                            { latitude: userLocation.latitude, longitude: userLocation.longitude },
                            { latitude: hunt.location.latitude, longitude: hunt.location.longitude },
                        ]}
                        strokeColor={Colors.error500}
                        strokeWidth={2}
                    />
                )}
                <Marker
                    coordinate={hunt.location}
                    title="Framme! Föreviga med en bild!"
                />
            </MapView>

            <View style={styles.actions}>
                <Button title="Take Photo" onPress={takeImageHandler} />
                <Text style={styles.text}>{photos.length}/1 photo(s) taken</Text>
                <View style={styles.imgContainer}>
                    {photos.map((photo, index) => (
                        <Image
                            key={index}
                            source={{ uri: photo }}
                            style={styles.previewImage}
                        />
                    ))}
                </View>
                <Button title="Complete Mission" onPress={handleCompleteMission} />
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 500,
        width: Dimensions.get('window').width,
    },
    actions: {
        alignItems: 'center',
        marginVertical: 20,
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    previewImage: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 50,
    },
    text: {
        marginTop: 5,
        marginBottom: 5,
        color: '#333',
    },
});

export default InGameScreen;
