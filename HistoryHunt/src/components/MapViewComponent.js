import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

const MapViewComponent = ({
    markers = [],
    onMarkerPress = () => { },  // Funktion som triggas vid klick på kartan
    region,
    selectedLocation
}) => {
    return (
        <MapView
            style={styles.map}
            onPress={(e) => onMarkerPress(e.nativeEvent.coordinate)}  // Hantera klick på kartan
            region={region}
            showsUserLocation={true}
        >
            {selectedLocation && (
                <Marker
                    coordinate={selectedLocation}
                    title="Selected Location"
                    pinColor="red"
                />
            )}
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker}
                    title={`Marker ${index + 1}`}
                    pinColor="blue"
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapViewComponent;
