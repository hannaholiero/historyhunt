// src/components/UserProfile.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles'; // Importera dina färger

const UserProfile = ({ username, image }) => (
    <View style={styles.profileContainer}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
    </View>
);

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary500,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: Colors.primary800,
    },
});

export default UserProfile;
