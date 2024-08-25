import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

const ProfileHeader = ({ username, imageUri }) => (
    <View style={styles.profileContainer}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />
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
        borderColor: Colors.primary500,
        borderWidth: 2,
    },
    username: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary800,
    },
});

export default ProfileHeader;
