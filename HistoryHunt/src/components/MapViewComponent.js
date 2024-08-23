import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

const MapViewComponent = ({
    markers = [],
    onMarkerPress = () => { },
    region,
    selectedLocation
}) => {
    return (
        <MapView
            style={styles.map}
            onPress={(e) => onMarkerPress(e.nativeEvent.coordinate)}
            region={region}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
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
