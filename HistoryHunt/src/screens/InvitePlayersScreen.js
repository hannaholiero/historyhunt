import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { ScreenLayout, Card, CardContainer } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';
import CustomButton from '../components/common/Button';

const InvitePlayersScreen = ({ navigation, route }) => {
    const { hunt, userLocation } = route.params;
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [loading, setLoading] = useState(true); // Lägg till laddningsstatus

    useEffect(() => {
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
        } finally {
            setLoading(false); // Stäng av laddningsstatus
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

    if (loading) {
        return (
            <ScreenLayout title="Bjud in">
                <ActivityIndicator size="large" color={Colors.primary800} />
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout title="Bjud in">
            <FlatList
                data={players}
                renderItem={renderPlayerItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                    <CustomButton title="Invite" onPress={invitePlayers} />
                }
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginBottom: 20,
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    selectedPlayerItem: {
        backgroundColor: '#c0c0c0',
    },
});

export default InvitePlayersScreen;
