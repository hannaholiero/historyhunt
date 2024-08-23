import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { storage, database } from '../../firebaseConfig';

export default function CreateHuntScreen({ navigation }) {
    const [huntTitle, setHuntTitle] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [image, setImage] = useState(null);

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your camera roll to upload images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreateHunt = async () => {
        if (!huntTitle || !estimatedTime) {
            Alert.alert('Missing Information', 'Please provide both a title and estimated time.');
            return;
        }

        let uploadedImageUrl = '';

        if (image) {
            const imageResponse = await fetch(image);
            const imageBlob = await imageResponse.blob();
            const imageRef = ref(storage, `hunts/${Date.now()}.jpg`);

            try {
                await uploadBytes(imageRef, imageBlob);
                uploadedImageUrl = await getDownloadURL(imageRef);
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Error', 'Failed to upload image. Please try again.');
                return;
            }
        } else {
            // Fallback to a default image URL if none is selected by the user
            uploadedImageUrl = 'https://example.com/default-image.jpg'; // Replace with your own default image URL
        }

        try {
            const newHuntRef = push(dbRef(database, 'hunts'));
            await set(newHuntRef, {
                huntTitle: huntTitle.trim(),
                estimatedTime: estimatedTime.trim(),
                huntImage: uploadedImageUrl,
                participants: [],
                completedBy: [],
            });

            navigation.navigate('CreateHuntMap', {
                huntTitle,
                estimatedTime,
                huntId: newHuntRef.key,
                huntImage: uploadedImageUrl,
            });
        } catch (error) {
            console.error('Error creating hunt:', error);
            Alert.alert('Error', 'An error occurred while creating the hunt.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter hunt title"
                value={huntTitle}
                onChangeText={setHuntTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter estimated time"
                value={estimatedTime}
                onChangeText={setEstimatedTime}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.imagePlaceholderText}>Pick an Image</Text>
                )}
            </TouchableOpacity>

            <Button title="Create Hunt" onPress={handleCreateHunt} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    imagePlaceholderText: {
        color: '#888',
    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
});
