import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Spacing, Typography } from '../../constants/Theme';

const ImagePickerComponent = ({ imageUri, onImagePicked }) => {
    const [image, setImage] = useState(imageUri);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            onImagePicked(result.uri);  // Skicka tillbaka URI:n till parent-komponenten
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatarContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                    <Text style={styles.text}>Välj en bild</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 75,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',

        borderWidth: 1,
        borderColor: Colors.primary500,
        marginBottom: Spacing.medium,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
    text: {
        ...Typography.header2,
        color: Colors.primary800,
        textAlign: 'center',
    },
});

export default ImagePickerComponent;
