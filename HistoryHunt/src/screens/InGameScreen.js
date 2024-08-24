import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Alert,
    ScrollView,
    Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/CustomButton';

const InGameScreen = ({ route, navigation }) => {
    const { hunt, userLocation } = route.params; // Ta emot userLocation här
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
    const [mediaPermissionInformation, requestMediaPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        const requestPermissions = async () => {
            const cameraStatus = await requestCameraPermission();
            const mediaStatus = await requestMediaPermission();

            if (cameraStatus.status !== PermissionStatus.GRANTED || mediaStatus.status !== PermissionStatus.GRANTED) {
                Alert.alert(
                    'Insufficient Permissions!',
                    'You need to grant camera and media library permissions to use this feature.'
                );
            }
        };

        requestPermissions();
    }, []);

    const handleMarkerPress = (location) => {
        setSelectedMarker(location);
    };

    const takeImageHandler = async () => {
        if (cameraPermissionInformation.status !== PermissionStatus.GRANTED || mediaPermissionInformation.status !== PermissionStatus.GRANTED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera and media library permissions to use this feature.'
            );
            return;
        }

        navigation.navigate('TakePhoto', { selectedMarker });
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
                    onPress={() => handleMarkerPress(hunt.location)}
                />
            </MapView>

            {selectedMarker && (
                <View style={styles.actions}>
                    <Button title="Take Photo" onPress={takeImageHandler} />
                    <Text style={styles.text}>
                        {photos.length}/1 photo(s) taken
                    </Text>
                    <View style={styles.imgContainer}>
                        {photos.map((photo, index) => (
                            <Image
                                key={index}
                                source={{ uri: photo }}
                                style={styles.previewImage}
                            />
                        ))}
                    </View>
                </View>
            )}
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
        color: '#ee00ee7e',
    },
});

export default InGameScreen;
