import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, update } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAvatar = ({ uri, onImagePicked }) => {
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUploading(true);
            try {
                const uploadUri = result.assets[0].uri; // Use result.assets[0].uri for the selected image
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    Alert.alert('Error', 'User ID not found.');
                    return;
                }

                const storage = getStorage();
                const storageRef = ref(storage, `profilePictures/${userId}`);

                // Convert the image to a blob for uploading
                const response = await fetch(uploadUri);
                const blob = await response.blob();

                await uploadBytes(storageRef, blob);

                // Get the download URL
                const downloadURL = await getDownloadURL(storageRef);

                // Update the user's profile picture URL in the database
                const database = getDatabase();
                const userRef = dbRef(database, `users/${userId}`);
                await update(userRef, { profilePicture: downloadURL });

                onImagePicked(downloadURL);
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Error', 'An error occurred while uploading the image.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <TouchableOpacity onPress={pickImage} disabled={uploading}>
            <View style={styles.avatarContainer}>
                {uploading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Image source={{ uri }} style={styles.avatar} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderWidth: 5,               // Borderns tjocklek
        borderColor: '#ee00ee7e'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
});

export default UserAvatar;
