import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import UserAvatar from '../components/user/UserAvatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ScreenLayout, Card } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';



const ProfileScreen = () => {
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                const database = getDatabase();
                const userRef = ref(database, `users/${userId}/profilePicture`);
                onValue(userRef, (snapshot) => {
                    const uri = snapshot.val();
                    if (uri) {
                        setProfilePicture(uri);
                    }
                });
            }
        };

        fetchProfilePicture();
    }, []);

    const handleImagePicked = (newUri) => {
        setProfilePicture(newUri);
    };

    return (
        <ScreenLayout title="Ändra profilbild">

            <UserAvatar uri={profilePicture} onImagePicked={handleImagePicked} />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfileScreen;
