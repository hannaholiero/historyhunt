import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';
import * as Location from 'expo-location';

const InvitePlayersScreen = ({ navigation, route }) => {
    const { huntId, huntTitle, estimatedTime, huntImage, location } = route.params;
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        console.log("Received huntTitle in InvitePlayersScreen:", huntTitle);
        fetchPlayers();
        fetchUserLocation(); // Hämtar användarens position
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            );
            const users = response.data;
            const userList = Object.keys(users).map((key) => ({
                id: key,
                ...users[key],
            }));

            setPlayers(userList);
        } catch (error) {
            console.error('Error fetching players:', error);
            Alert.alert('Error', 'An error occurred while fetching players.');
        }
    };

    const fetchUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location was denied.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            console.error('Error fetching user location:', error);
        }
    };

    const togglePlayerSelection = (playerId) => {
        setSelectedPlayers((prevSelected) =>
            prevSelected.includes(playerId)
                ? prevSelected.filter((id) => id !== playerId)
                : [...prevSelected, playerId]
        );
    };

    const invitePlayers = async () => {
        if (!userLocation) {
            Alert.alert('Location Missing', 'User location is required to send invitations.');
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('userId');
            const firstname = await AsyncStorage.getItem('firstname');

            const invitations = selectedPlayers.map((playerId) => {
                const invitationRef = ref(database, `users/${playerId}/invitations/${huntId}`);
                return set(invitationRef, {
                    huntTitle,
                    estimatedTime,
                    huntImage,
                    invitedBy: firstname || userId,
                    location,
                    userLocation,
                });
            });

            await Promise.all(invitations);

            Alert.alert('Success', 'Players invited successfully!');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error sending invitations:', error);
            Alert.alert('Error', 'An error occurred while sending invitations.');
        }
    };

    const renderPlayerItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.playerItem,
                selectedPlayers.includes(item.id) && styles.selectedPlayerItem,
            ]}
            onPress={() => togglePlayerSelection(item.id)}
        >
            <Text>{item.email}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invite Players to Hunt</Text>
            <FlatList
                data={players}
                renderItem={renderPlayerItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            <Button title="Invite" onPress={invitePlayers} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        flex: 1,
        marginBottom: 20,
    },
    playerItem: {
        padding: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 10,
    },
    selectedPlayerItem: {
        backgroundColor: '#c0c0c0',
    },
});

export default InvitePlayersScreen;
