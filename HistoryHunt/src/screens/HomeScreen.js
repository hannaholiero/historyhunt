import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import CustomButton from '../components/common/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

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
                        huntImage: hunts[huntId].huntImage
                    }));
                    setPlannedHunts(formattedPlannedHunts);
                });

                const invitationsRef = ref(database, `users/${storedUserId}/invitations`);
                onValue(invitationsRef, (snapshot) => {
                    const invitations = snapshot.val() || {};
                    const formattedInvitations = Object.keys(invitations).map(inviteId => ({
                        ...invitations[inviteId],
                        inviteId,
                    }));
                    setActiveHunts(formattedInvitations.filter(hunt => !completedHunts.some(completedHunt => completedHunt.huntId === hunt.huntId)));
                });

                const completedHuntsRef = ref(database, `users/${storedUserId}/completedHunts`);
                onValue(completedHuntsRef, (snapshot) => {
                    const hunts = snapshot.val() || {};
                    const formattedCompletedHunts = Object.keys(hunts).map(huntId => ({
                        ...hunts[huntId],
                        huntId,
                        huntImage: hunts[huntId].huntImage
                    }));
                    setCompletedHunts(formattedCompletedHunts);
                });

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
    }, [completedHunts]);

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const renderMedalItem = ({ item }) => (
        <TouchableOpacity
            style={styles.medalItem}
            onPress={() => navigation.navigate('FinishedHunt', {
                hunt: item,
                photoUri: item.huntImage || 'https://default-image-url.com'
            })}
        >
            <Image source={{ uri: item.huntImage || 'https://picsum.photos/80' }} style={styles.medalImage} />
            <Text style={styles.medalTitle}>{item.huntTitle || "Completed Hunt"}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={Typography.header3}>{userFirstName}</Text>
                <TouchableOpacity onPress={handleProfilePress} style={styles.profileImageContainer}>
                    <Image style={styles.profileImage} source={{ uri: profilePicture || 'https://via.placeholder.com/150' }} />
                    <View style={styles.editIconContainer}>
                        <MaterialIcons name="edit" size={24} color="white" />
                    </View>
                </TouchableOpacity>

            </View>

            <Text style={Typography.header2}>INBJUDNINGAR</Text>
            <FlatList
                data={activeHunts.filter(hunt => hunt.createdBy !== userFirstName && !completedHunts.some(completedHunt => completedHunt.huntId === hunt.huntId))}
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

            <Text style={Typography.header2}>MINA HUNTS</Text>
            <FlatList
                data={plannedHunts.filter(hunt => hunt.createdBy === userFirstName)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.huntItem} onPress={() => navigation.navigate('ConfirmHunt', { hunt: item })}>
                        <Image source={{ uri: item.huntImage || 'https://picsum.photos/80' }} style={styles.huntImage} />
                        <View>
                            <Text style={styles.huntTitle}>{item.huntTitle || "Untitled Hunt"}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />

            <CustomButton title="Skapa hunt" onPress={() => navigation.navigate('CreateHunt')} />

            <View style={styles.medalsContainer}>
                <Text style={styles.medalsTitle}>MEDALJER</Text>
                <FlatList
                    data={completedHunts}
                    renderItem={renderMedalItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    style={styles.medalsList}
                    initialNumToRender={3}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ContainerStyles.screenContainer.backgroundColor,
        padding: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImageContainer: {
        position: 'relative',
        marginLeft: 20
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
        backgroundColor: Colors.primary800,
        opacity: 0.8,
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
        maxHeight: 150,
    },
    huntItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    huntImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        padding: 10,
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
        marginTop: 10,
    },
    medalsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medalsList: {
        marginTop: 10,
        minHeight: 80,
    },
    medalItem: {
        alignItems: 'center',
        marginHorizontal: 5,
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
