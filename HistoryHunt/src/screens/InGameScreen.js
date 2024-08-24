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
        try {
            const timestamp = new Date().toISOString();
            const firstname = await AsyncStorage.getItem('firstname');

            for (const photoUri of photos) {
                const newPhotoRef = push(ref(database, `hunts/${hunt.huntId}/photos`));
                await update(newPhotoRef, {
                    user: firstname,
                    timestamp: timestamp,
                    photoUri: photoUri,
                    location: hunt.location,
                });
            }

            Alert.alert("Mission Completed", "Congratulations! You've completed the mission.");
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error saving mission data:", error);
            Alert.alert("Error", "There was a problem saving the mission data. Please try again.");
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
