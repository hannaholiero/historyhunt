import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // För pennsymbolen

const HomeScreen = ({ navigation }) => {
    const activeHunts = [
        { id: '1', name: 'Hunt 1' },
        { id: '2', name: 'Hunt 2' },
        // Lägg till fler hunts här
    ];

    const plannedHunts = [
        { id: '1', name: 'Planned Hunt 1' },
        { id: '2', name: 'Planned Hunt 2' },
        // Lägg till fler planned hunts här
    ];

    const completedHunts = [
        { id: '1', name: 'Completed Hunt 1' },
        { id: '2', name: 'Completed Hunt 2' },
        // Lägg till fler completed hunts här
    ];

    const renderHuntItem = ({ item }) => (
        <View style={styles.huntItem}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.profileImage} />
                <TouchableOpacity style={styles.editIcon} onPress={() => Alert.alert('Edit Profile Image')}>
                    <Ionicons name="pencil" size={24} color="orange" />
                </TouchableOpacity>
                <Text style={styles.profileName}>User Name</Text>
            </View>

            <Text style={styles.sectionTitle}>Active Hunts</Text>
            <FlatList
                data={activeHunts}
                renderItem={renderHuntItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />

            <Text style={styles.sectionTitle}>Planned Hunts</Text>
            <FlatList
                data={plannedHunts}
                renderItem={renderHuntItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />

            <TouchableOpacity
                style={styles.createHuntButton}
                onPress={() => navigation.navigate('CreateHunt')}
            >
                <Text style={styles.createHuntButtonText}>Create Hunt</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Medals</Text>
            <FlatList
                data={completedHunts}
                renderItem={renderHuntItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
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
        borderWidth: 2,
        borderColor: 'gray',
    },
    editIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 2,
    },
    profileName: {
        fontSize: 20,
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
        padding: 10,
        backgroundColor: '#f0e68c',
        borderRadius: 8,
        marginBottom: 10,
    },
    createHuntButton: {
        backgroundColor: '#6b8e23',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    createHuntButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen;
