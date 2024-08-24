import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const FinishedHuntScreen = ({ route, navigation }) => {
    const { hunt, photoUri } = route.params;

    return (
        <View style={styles.container}>
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
            <Text style={styles.congratsText}>You finished the hunt!</Text>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    map: {
        height: 300,
        width: '100%',
    },
    congratsText: {
        fontSize: 24,
        marginVertical: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});

export default FinishedHuntScreen;
