import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PhotoScreen = ({ navigation, route }) => {
    const [image, setImage] = useState(null);
    const { hunt } = route.params;

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            navigation.navigate('FinishedHunt', {
                hunt: hunt,  // Skicka tillbaka hunt-objektet
                photoUri: result.assets[0].uri,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Take Photo" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});

export default PhotoScreen;
