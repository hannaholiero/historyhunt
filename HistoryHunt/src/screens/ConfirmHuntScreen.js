import React, { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ScreenLayout, Card } from '../components/layout/Layout';
import CustomButton from '../components/common/Button';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

const ConfirmHuntScreen = ({ route, navigation }) => {
    const { hunt } = route.params || {}; // Om hunt är undefined, sätt det som tomt objekt

    useEffect(() => {
        if (!hunt) {
            Alert.alert('Error', 'Hunt data is missing.');
            navigation.goBack(); // Gå tillbaka till föregående skärm om hunt är undefined
        } else {
            console.log("Received hunt in ConfirmHuntScreen:", hunt);
            console.log("Received location in ConfirmHuntScreen:", hunt.location);
        }
    }, [hunt, navigation]);

    if (!hunt || !hunt.location) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Hunt data or location is missing.</Text>
            </View>
        );
    }

    const handleConfirm = () => {
        if (hunt.location) {
            navigation.navigate('InGame', {
                hunt, // Skicka hela hunt-objektet med platsdata
            });
        } else {
            Alert.alert('Error', 'Location not found.');
        }
    };

    return (
        <ScreenLayout title="Bekräfta hunt">
            <View style={styles.huntInfo}>
                <Text style={Typography.header2}>Du valde: {hunt.huntTitle}</Text>

            </View>

            {hunt.location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: hunt.location.latitude,
                        longitude: hunt.location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={hunt.location} title="Din markering" />
                </MapView>
            ) : (
                <Text style={styles.errorText}>Location not found</Text>
            )}

            <Text style={styles.estimatedTime}>Beräknad tid att slutföra: {hunt.estimatedTime} minuter</Text>
            <CustomButton title="Nu kör vi!" onPress={handleConfirm} />
        </ScreenLayout>
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
        marginRight: 10, // Lägg till lite utrymme mellan text och bild
    },
    huntInfo: {
        flexDirection: 'row', // För att lägga elementen på samma rad
        alignItems: 'center',
        justifyContent: 'center', // Centrerar innehållet horisontellt
        marginBottom: 20,
    },
    huntImage: {
        width: 40,
        height: 40,
        marginLeft: 10, // Lägg till lite utrymme mellan text och bild
    },
    huntTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10, // Lägg till lite utrymme mellan titeln och bilden
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