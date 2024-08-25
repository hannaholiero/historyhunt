import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../components/common/Button';
import { ScreenLayout } from '../components/layout/Layout';
import { Colors, Typography, Spacing } from '../constants/Theme';

const CreateHuntMapScreen = ({ route, navigation }) => {
    const { hunt } = route.params;
    const [isLoadingMap, setIsLoadingMap] = useState(true); // Ny state för laddning av karta

    const handleConfirmLocation = () => {
        // Hantera bekräftelse av plats och navigera till nästa skärm
        navigation.navigate('ConfirmHunt', { hunt });
    };

    return (
        <ScreenLayout title="Välj startplats">
            <View style={styles.mapContainer}>
                {isLoadingMap && (
                    <ActivityIndicator
                        size="large"
                        color={Colors.primary800}
                        style={styles.spinner}
                    />
                )}
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: hunt.location.latitude,
                        longitude: hunt.location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onMapReady={() => setIsLoadingMap(false)} // När kartan är klar, göm spinnaren
                >
                    <Marker coordinate={hunt.location} title="Startplats" />
                </MapView>
            </View>
            <Text style={styles.infoText}>Placera markören på kartan för att välja startplats.</Text>
            <Button title="Bekräfta plats" onPress={handleConfirmLocation} />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        height: 300,
        width: '100%',
        position: 'relative', // Behövs för att placera spinnaren korrekt
    },
    map: {
        flex: 1,
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -25, // För att centrera spinnaren
        marginTop: -25,  // För att centrera spinnaren
    },
    infoText: {
        ...Typography.bodyText,
        marginVertical: Spacing.medium,
    },
});

export default CreateHuntMapScreen;
