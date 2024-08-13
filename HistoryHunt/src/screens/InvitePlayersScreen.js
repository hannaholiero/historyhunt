import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const InvitePlayersScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        // Hämta användare från databasen när skärmen laddas
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/user.json'
                );

                const usersData = response.data;
                const usersList = Object.keys(usersData).map(key => ({
                    id: key,
                    email: usersData[key].email,
                }));

                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
                Alert.alert('Error', 'Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    const toggleSelectUser = (userId) => {
        setSelectedUsers(prevSelectedUsers =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter(id => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const handleInvite = () => {
        if (selectedUsers.length === 0) {
            Alert.alert('Error', 'Please select at least one player to invite.');
            return;
        }

        // Här kan du implementera logik för att skicka inbjudningar
        Alert.alert('Success', `Invited ${selectedUsers.length} players!`);
        navigation.navigate('Home');
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.userItem, selectedUsers.includes(item.id) && styles.userItemSelected]}
            onPress={() => toggleSelectUser(item.id)}
        >
            <Text style={styles.userEmail}>{item.email}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invite Players to Hunt</Text>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <View style={styles.buttonContainer}>
                <Button title="Invite Selected Players" onPress={handleInvite} />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Back to Home"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fbf5e9',
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
    userItem: {
        padding: 15,
        backgroundColor: '#f0e68c',
        borderRadius: 8,
        marginBottom: 10,
    },
    userItemSelected: {
        backgroundColor: '#6b8e23',
    },
    userEmail: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default InvitePlayersScreen;
