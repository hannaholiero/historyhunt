import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';
import CustomButton from '../components/common/Button';
import { ScreenLayout, Card, CardContainer } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

const InvitePlayersScreen = ({ navigation, route }) => {
    const { hunt, userLocation } = route.params;
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
        console.log("Received hunt in InvitePlayersScreen:", hunt);
        console.log("Received userLocation in InvitePlayersScreen:", userLocation);
        fetchPlayers();
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
                const invitationRef = ref(database, `users/${playerId}/invitations/${hunt.huntId}`);
                return set(invitationRef, {
                    ...hunt,
                    invitedBy: firstname || userId,
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
        <ScreenLayout title="Bjud in">
            <CardContainer>
                <FlatList
                    data={players}
                    renderItem={renderPlayerItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                />
                <CustomButton title="Bjud in" onPress={invitePlayers} />
            </CardContainer>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginBottom: Spacing.medium,
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'left',

        padding: Spacing.medium,
        borderRadius: Spacing.small,
        marginBottom: Spacing.medium,
    },
    selectedPlayerItem: {
        borderWidth: 1,

    },
});

export default InvitePlayersScreen;
