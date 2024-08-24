import React, { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ConfirmHuntScreen = ({ route, navigation }) => {
    const { huntTitle, invitedBy, huntImage, estimatedTime, location } = route.params || {}; // Använd tomt objekt som fallback

    useEffect(() => {
        if (!location) {
            Alert.alert("Location Error", "Location data is missing or invalid.");
            console.error("Received invalid location data:", location);
        } else {
            console.log("Received location in ConfirmHuntScreen:", location);
        }
    }, [location]);

    const handleConfirm = () => {
        if (location) {
            navigation.navigate('InGame', {
                hunt: {
                    huntTitle,
                    estimatedTime,
                    huntImage,
                    location,
                },
            });
        } else {
            Alert.alert('Error', 'Location not found.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CONFIRM HUNT</Text>
            <Text style={styles.subTitle}>You selected: {huntTitle}</Text>
            <View style={styles.huntInfo}>
                <Image source={{ uri: huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
                <View>
                    <Text style={styles.huntTitle}>{huntTitle}</Text>
                </View>
            </View>

            {/* Visa kartan om platsen finns */}
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={location} title="Selected Location" />
                </MapView>
            ) : (
                <Text style={styles.errorText}>Location not found</Text>
            )}

            <Text style={styles.estimatedTime}>Estimated Time: {estimatedTime} minutes</Text>
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
    map: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    estimatedTime: {
        fontSize: 18,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
});

export default ConfirmHuntScreen;
