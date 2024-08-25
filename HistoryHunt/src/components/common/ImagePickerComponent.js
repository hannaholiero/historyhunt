import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Spacing, Typography } from '../../constants/Theme';

const ImagePickerComponent = ({ imageUri, onImagePicked }) => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            onImagePicked(result.assets[0].uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Text style={styles.imagePickerText}>Välj en bild</Text>
            )}
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    imagePickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: Spacing.large,
        alignSelf: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imagePickerText: {
        color: Colors.primary800,
        fontSize: Typography.bodyText.fontSize,
        fontWeight: Typography.bodyText.fontWeight,
        textAlign: 'center',
    },
});



export default ImagePickerComponent;
