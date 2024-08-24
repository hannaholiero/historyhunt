import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
    const [plannedHunts, setPlannedHunts] = useState([]);
    const [activeHunts, setActiveHunts] = useState([]);
    const [userFirstName, setUserFirstName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            const firstname = await AsyncStorage.getItem('firstname');
            setUserFirstName(firstname);
            setUserId(storedUserId);

            if (storedUserId) {
                const plannedHuntsRef = ref(database, `users/${storedUserId}/plannedHunts`);
                onValue(plannedHuntsRef, (snapshot) => {
                    const hunts = snapshot.val() || {};
                    const formattedPlannedHunts = Object.keys(hunts).map(huntId => ({
                        ...hunts[huntId],
                        huntId,
                    }));
                    setPlannedHunts(formattedPlannedHunts);
                });

                const activeHuntsRef = ref(database, `users/${storedUserId}/invitations`);
                onValue(activeHuntsRef, (snapshot) => {
                    const hunts = snapshot.val() || {};
                    const formattedActiveHunts = Object.keys(hunts).map(huntId => ({
                        ...hunts[huntId],
                        huntId,
                    }));
                    setActiveHunts(formattedActiveHunts);
                });
            }
        };

        fetchUserData();
    }, []);

    // const renderHuntItem = ({ item }) => (
    //     <TouchableOpacity style={styles.huntItem} onPress={() => navigation.navigate('ConfirmHunt', item)}>
    //         <Image source={{ uri: item.huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
    //         <View>
    //             <Text style={styles.huntTitle}>{item.huntTitle || item.huntName || "Untitled Hunt"}</Text>
    //             <Text style={styles.huntDetails}>Inbjuden av {item.createdBy || 'N/A'}</Text>
    //         </View>
    //     </TouchableOpacity>
    // );

    const renderHuntItem = ({ item }) => (
        <TouchableOpacity
            style={styles.huntItem}
            onPress={() => navigation.navigate('ConfirmHunt', {
                huntId: item.huntId,
                huntTitle: item.huntTitle || item.huntName,
                estimatedTime: item.estimatedTime,
                huntImage: item.huntImage,
                location: item.location, // Skicka med location här
                createdBy: item.createdBy,
            })}
        >
            <Image source={{ uri: item.huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
            <View>
                <Text style={styles.huntTitle}>{item.huntTitle || item.huntName || "Untitled Hunt"}</Text>
                <Text style={styles.huntDetails}>Inbjuden av {item.createdBy || 'N/A'}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.profileName}>{userFirstName}</Text>
                <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/150' }} />
            </View>

            <Text style={styles.sectionTitle}>Active Hunts</Text>
            <FlatList
                data={activeHunts.filter(hunt => hunt.createdBy !== userFirstName)} // Endast jakter som skapats av andra
                renderItem={renderHuntItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />

            <Text style={styles.sectionTitle}>Planned Hunts</Text>
            <FlatList
                data={plannedHunts.filter(hunt => hunt.createdBy === userFirstName)} // Endast jakter som skapats av användaren
                renderItem={renderHuntItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />

            <CustomButton title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />

            <View style={styles.medalsContainer}>
                <Text style={styles.medalsTitle}>MEDALS</Text>
                <View style={styles.medals}>
                    <View style={styles.medal} />
                    <View style={styles.medal} />
                    <View style={styles.medal} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf5e9',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    list: {
        marginBottom: 20,
    },
    huntItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f0e68c',
        borderRadius: 8,
        marginBottom: 10,
    },
    huntImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    huntTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    huntDetails: {
        fontSize: 14,
        color: '#555',
    },
    medalsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    medalsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medals: {
        flexDirection: 'row',
        marginTop: 10,
    },
    medal: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffd700',
        marginHorizontal: 5,
    },
});

export default HomeScreen;
