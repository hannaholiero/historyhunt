import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../components/CustomButton';
import { ref, push, update } from 'firebase/database';
import { database } from '../../firebaseConfig';

const InGameScreen = ({ route, navigation }) => {
    const { hunt, photoUri } = route.params;
    const [photos, setPhotos] = useState(photoUri ? [photoUri] : []);

    const handleCompleteMission = async () => {
        if (!missionCompleted) {
            try {
                setMissionCompleted(true);

                // Hämta aktuellt datum och tid
                const timestamp = new Date().toISOString();

                // Hämta användarens förnamn (vi antar att det redan finns sparat i AsyncStorage)
                const firstname = await AsyncStorage.getItem('firstname');

                // Hämta huntId från hunt-objektet
                const huntId = hunt.huntId;

                // Kontrollera att huntId finns
                if (!huntId) {
                    Alert.alert('Error', 'Hunt ID is missing.');
                    return;
                }

                // Spara varje foto tillsammans med användarens data i Firebase
                for (const photoUri of photos) {
                    const newPhotoRef = push(ref(database, `hunts/${huntId}/photos`));
                    await update(newPhotoRef, {
                        user: firstname,
                        timestamp: timestamp,
                        photoUri: photoUri,
                        location: hunt.location,  // Spara platsdata för varje foto
                    });
                }

                Alert.alert("Mission Completed", "Congratulations! You've completed the mission.");

                // Navigera till FinishGameScreen med hunt och photoUri
                navigation.navigate('FinishGame', {
                    hunt: { ...hunt, huntId },  // Skicka hela hunt-objektet inklusive huntId
                    photoUri: photos[0],  // Om det bara är ett foto
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
        <ScrollView style={styles.form}>
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
                <Marker
                    coordinate={hunt.location}
                    title="Hunt Location"
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
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
