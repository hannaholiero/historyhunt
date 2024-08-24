import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons'; // För penna-ikonen

const HomeScreen = ({ navigation }) => {
    const [plannedHunts, setPlannedHunts] = useState([]);
    const [activeHunts, setActiveHunts] = useState([]);
    const [completedHunts, setCompletedHunts] = useState([]);
    const [userFirstName, setUserFirstName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            const firstname = await AsyncStorage.getItem('firstname');
            setUserFirstName(firstname);

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

                const activeHuntsRef = ref(database, `users/${storedUserId}/activeHunts`);
                onValue(activeHuntsRef, (snapshot) => {
                    const hunts = snapshot.val() || {};
                    const formattedActiveHunts = Object.keys(hunts).map(huntId => ({
                        ...hunts[huntId],
                        huntId,
                    }));
                    setActiveHunts(formattedActiveHunts);
                });

                const completedHuntsRef = ref(database, `users/${storedUserId}/completedHunts`);
                onValue(completedHuntsRef, (snapshot) => {
                    const hunts = snapshot.val() || {};
                    const formattedCompletedHunts = Object.keys(hunts).map(huntId => ({
                        ...hunts[huntId],
                        huntId,
                    }));
                    setCompletedHunts(formattedCompletedHunts);
                });

                // Hämta profilbilden
                const profilePictureRef = ref(database, `users/${storedUserId}/profilePicture`);
                onValue(profilePictureRef, (snapshot) => {
                    const uri = snapshot.val();
                    if (uri) {
                        setProfilePicture(uri);
                    }
                });
            }
        };

        fetchUserData();
    }, []);

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const renderMedalItem = ({ item }) => (
        <TouchableOpacity
            style={styles.medalItem}
            onPress={() => navigation.navigate('FinishedGame', {
                hunt: item,
                photoUri: item.photoUri
            })}
        >
            <Image source={{ uri: item.photoUri || 'https://picsum.photos/80' }} style={styles.medalImage} />
            <Text style={styles.medalTitle}>{item.huntTitle || "Completed Hunt"}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handleProfilePress} style={styles.profileImageContainer}>
                    <Image style={styles.profileImage} source={{ uri: profilePicture || 'https://via.placeholder.com/150' }} />
                    <View style={styles.editIconContainer}>
                        <MaterialIcons name="edit" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.profileName}>{userFirstName}</Text>
            </View>

            <Text style={styles.sectionTitle}>Active Hunts</Text>
            <FlatList
                data={activeHunts.filter(hunt => hunt.createdBy !== userFirstName)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.huntItem} onPress={() => navigation.navigate('ConfirmHunt', { hunt: item })}>
                        <Image source={{ uri: item.huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
                        <View>
                            <Text style={styles.huntTitle}>{item.huntTitle || "Untitled Hunt"}</Text>
                            <Text style={styles.huntDetails}>Inbjuden av {item.createdBy || 'N/A'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />

            <Text style={styles.sectionTitle}>Planned Hunts</Text>
            <FlatList
                data={plannedHunts.filter(hunt => hunt.createdBy === userFirstName)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.huntItem} onPress={() => navigation.navigate('ConfirmHunt', { hunt: item })}>
                        <Image source={{ uri: item.huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
                        <View>
                            <Text style={styles.huntTitle}>{item.huntTitle || "Untitled Hunt"}</Text>
                            <Text style={styles.huntDetails}>Inbjuden av {item.createdBy || 'N/A'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />

            <CustomButton title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />

            <View style={styles.medalsContainer}>
                <Text style={styles.medalsTitle}>MEDALS</Text>
                <FlatList
                    data={completedHunts}
                    renderItem={renderMedalItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    style={styles.medalsList}
                    initialNumToRender={3} // Begränsar initial render för bättre prestanda
                />
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
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#00000099',
        borderRadius: 12,
        padding: 4,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
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
    medalsList: {
        marginTop: 10,
    },
    medalItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    medalImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    medalTitle: {
        marginTop: 5,
        fontSize: 14,
    },
});

export default HomeScreen;
