
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const [activeHunts, setActiveHunts] = useState([]);
//     const [plannedHunts, setPlannedHunts] = useState([]);
//     const [userEmail, setUserEmail] = useState('');

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const email = await AsyncStorage.getItem('userEmail');
//             setUserEmail(email);

//             // Fetch user data
//             const response = await axios.get(
//                 `https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json`
//             );

//             const usersData = response.data;

//             // Filter active hunts
//             const active = [];
//             const planned = [];

//             Object.keys(usersData).forEach(key => {
//                 const user = usersData[key];

//                 if (user.email === email) {
//                     if (user.plannedHunts) {
//                         planned.push(...Object.values(user.plannedHunts));
//                     }
//                     if (user.invitations) {
//                         active.push(...Object.values(user.invitations));
//                     }
//                 }
//             });

//             setActiveHunts(active);
//             setPlannedHunts(planned);
//         };

//         fetchUserData();
//     }, []);

//     const renderHuntItem = ({ item }) => (
//         <View style={styles.huntItem}>
//             <Image
//                 source={{ uri: item.huntImage || 'https://picsum.photos/40' }}
//                 style={styles.huntIcon}
//             />
//             <View>
//                 <Text style={styles.huntTitle}>{item.huntName}</Text>
//                 <Text style={styles.huntDetails}>Inbjuden av {item.invitedBy}</Text>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.profileName}>{userEmail}</Text>

//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Active Hunts</Text>
//                 <FlatList
//                     data={activeHunts}
//                     renderItem={renderHuntItem}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             </View>

//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Planned Hunts</Text>
//                 <FlatList
//                     data={plannedHunts}
//                     renderItem={renderHuntItem}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             </View>

//             <TouchableOpacity
//                 style={styles.createHuntButton}
//                 onPress={() => navigation.navigate('CreateHunt')}
//             >
//                 <Text style={styles.createHuntButtonText}>Create Hunt</Text>
//             </TouchableOpacity>

//             <View style={styles.medalsSection}>
//                 <Text style={styles.medalsTitle}>MEDALS</Text>
//                 <Image source={{ uri: 'https://picsum.photos/80' }} style={styles.medalsIcon} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#e7e8d1',
//         padding: 20,
//     },
//     profileName: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginVertical: 10,
//     },
//     section: {
//         marginVertical: 10,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     huntItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     huntIcon: {
//         width: 40,
//         height: 40,
//         marginRight: 10,
//     },
//     huntTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     huntDetails: {
//         fontSize: 14,
//         color: '#555',
//     },
//     createHuntButton: {
//         backgroundColor: '#7ba467',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     createHuntButtonText: {
//         fontSize: 18,
//         color: '#ffffff',
//     },
//     medalsSection: {
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     medalsTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     medalsIcon: {
//         width: 80,
//         height: 80,
//     },
// });

// export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeHunts, setActiveHunts] = useState([]);
    const [plannedHunts, setPlannedHunts] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const email = await AsyncStorage.getItem('userEmail');
            setUserEmail(email);

            // Fetch user data
            const response = await axios.get(
                `https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json`
            );

            const usersData = response.data;

            // Filter active hunts
            const active = [];
            const planned = [];

            Object.keys(usersData).forEach(key => {
                const user = usersData[key];

                if (user.email === email) {
                    if (user.plannedHunts) {
                        planned.push(...Object.values(user.plannedHunts));
                    }
                    if (user.invitations) {
                        active.push(...Object.values(user.invitations));
                    }
                }
            });

            setActiveHunts(active);
            setPlannedHunts(planned);
        };

        fetchUserData();
    }, []);

    const handleHuntPress = (hunt) => {
        navigation.navigate('ConfirmHunt', {
            huntName: hunt.huntName,
            invitedBy: hunt.invitedBy,
            huntImage: hunt.huntImage,
            estimatedTime: hunt.estimatedTime,
        });
    };

    const renderHuntItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleHuntPress(item)}>
            <View style={styles.huntItem}>
                <Image
                    source={{ uri: item.huntImage || 'https://picsum.photos/40' }}
                    style={styles.huntIcon}
                />
                <View>
                    <Text style={styles.huntTitle}>{item.huntName}</Text>
                    <Text style={styles.huntDetails}>Inbjuden av {item.invitedBy}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.profileName}>{userEmail}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Active Hunts</Text>
                <FlatList
                    data={activeHunts}
                    renderItem={renderHuntItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Planned Hunts</Text>
                <FlatList
                    data={plannedHunts}
                    renderItem={renderHuntItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <TouchableOpacity
                style={styles.createHuntButton}
                onPress={() => navigation.navigate('CreateHunt')}
            >
                <Text style={styles.createHuntButtonText}>Create Hunt</Text>
            </TouchableOpacity>

            <View style={styles.medalsSection}>
                <Text style={styles.medalsTitle}>MEDALS</Text>
                <Image source={{ uri: 'https://picsum.photos/80' }} style={styles.medalsIcon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e8d1',
        padding: 20,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    huntItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    huntIcon: {
        width: 40,
        height: 40,
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
    createHuntButton: {
        backgroundColor: '#7ba467',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    createHuntButtonText: {
        fontSize: 18,
        color: '#ffffff',
    },
    medalsSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    medalsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    medalsIcon: {
        width: 80,
        height: 80,
    },
});

export default HomeScreen;
