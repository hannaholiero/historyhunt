import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import Button from '../components/CustomButton'; // Se till att du använder rätt sökväg
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Se till att sökvägen är korrekt

const CreateHuntScreen = ({ navigation }) => {
    const [huntTitle, setHuntTitle] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');


    const handleNextStep = async () => {
        if (!huntTitle || !estimatedTime) {
            Alert.alert('Missing Information', 'Please fill in all fields.');
            return;
        }

        const huntId = Date.now().toString(); // Generera ett unikt ID för jakten

        // Hämta användarens ID och förnamn från AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        const firstname = await AsyncStorage.getItem('firstname');

        if (!userId || !firstname) {
            Alert.alert('Error', 'User information is missing.');
            return;
        }

        // Skapa en standardbild om ingen laddas upp
        const huntImage = 'https://default-image-url';

        // Förbered jaktdata
        const huntData = {
            huntTitle,
            estimatedTime,
            huntImage,
            createdBy: firstname,
            participants: [],
            completedBy: [],
        };

        try {
            // Spara jakten i Firebase under hunts
            const newHuntRef = ref(database, `hunts/${huntId}`);
            await set(newHuntRef, huntData);

            // Koppla jakten till användarens plannedHunts
            const userPlannedHuntsRef = ref(database, `users/${userId}/plannedHunts/${huntId}`);
            await set(userPlannedHuntsRef, huntData);

            // Navigera till nästa skärm
            navigation.navigate('CreateHuntMap', {
                huntTitle,
                estimatedTime,
                huntImage,
                huntId,
            });
        } catch (error) {
            console.error('Error creating hunt:', error);
            Alert.alert('Error', 'An error occurred while creating the hunt.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Hunt Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter hunt title"
                value={huntTitle}
                onChangeText={setHuntTitle}
            />

            <Text style={styles.label}>Estimated Time (minutes)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter estimated time"
                value={estimatedTime}
                onChangeText={setEstimatedTime}
                keyboardType="numeric"
            />

            <Button title="Next" onPress={handleNextStep} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
});

export default CreateHuntScreen;
