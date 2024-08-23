import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HuntItem from '../components/HuntItem';
import CustomButton from '../components/CustomButton';
import UserProfile from '../components/UserProfile'; // Importera UserProfile-komponenten
import { Colors } from '../constants/styles';

const HomeScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');

                if (!userId) {
                    Alert.alert('Error', 'User not found.');
                    return;
                }

                const response = await axios.get(
                    `https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
                );

                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Error', 'Failed to load user data.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            {userData && (
                <>
                    {/* Visa användarnamn och avatarbild */}
                    <UserProfile
                        username={userData.firstname || 'User'}
                        image={userData.profileImage || 'https://cdn-icons-png.flaticon.com/512/17/17004.png'}
                    />

                    <Text style={styles.sectionTitle}>Invited Hunts</Text>
                    <FlatList
                        data={Object.values(userData.invitedHunts || {})}
                        renderItem={({ item }) => <HuntItem title={item.huntName} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={styles.sectionTitle}>Active Hunts</Text>
                    <FlatList
                        data={Object.values(userData.activeHunts || {})}
                        renderItem={({ item }) => <HuntItem title={item.huntName} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={styles.sectionTitle}>Planned Hunts</Text>
                    <FlatList
                        data={Object.values(userData.plannedHunts || {})}
                        renderItem={({ item }) => <HuntItem title={item.huntName} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <CustomButton title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.primary100,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.primary800,
    },
});

export default HomeScreen;
