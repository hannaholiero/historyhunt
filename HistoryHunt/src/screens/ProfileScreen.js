import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import UserAvatar from '../components/UserAvatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';

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
        <View style={styles.container}>

            <UserAvatar uri={profilePicture} onImagePicked={handleImagePicked} />
        </View>
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
