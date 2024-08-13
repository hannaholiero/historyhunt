import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const userImage = 'https://cdn-icons-png.flaticon.com/512/17/17004.png';
    const activeHunts = [{ id: '1', title: 'Active Hunt 1' }];
    const plannedHunts = [{ id: '2', title: 'Planned Hunt 1' }];
    const completedHunts = [{ id: '3', title: 'Completed Hunt 1' }];

    return (
        <View style={styles.container}>
            <Image source={{ uri: userImage }} style={styles.avatar} />
            <Text style={styles.sectionTitle}>Active Hunts</Text>
            <FlatList
                data={activeHunts}
                renderItem={({ item }) => (
                    <View style={styles.huntItem}>
                        <Text>{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.sectionTitle}>Planned Hunts</Text>
            <FlatList
                data={plannedHunts}
                renderItem={({ item }) => (
                    <View style={styles.huntItem}>
                        <Text>{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <Button title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />
            <Text style={styles.sectionTitle}>Medals</Text>
            <FlatList
                data={completedHunts}
                renderItem={({ item }) => (
                    <View style={styles.huntItem}>
                        <Text>{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    huntItem: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default HomeScreen;
