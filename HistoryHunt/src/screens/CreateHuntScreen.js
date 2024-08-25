import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import Button from '../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { ScreenLayout, Card } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

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
            huntId,
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
                hunt: huntData,
            });
        } catch (error) {
            console.error('Error creating hunt:', error);
            Alert.alert('Error', 'An error occurred while creating the hunt.');
        }
    };

    return (
        <ScreenLayout title="Skapa ny hunt">
            <Card>
                <Text style={styles.label}>Namn på hunt</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Kanske 'solnedgången på Röda sten'?"
                    value={huntTitle}
                    onChangeText={setHuntTitle}
                />

                <Text style={styles.label}>Beräknad tid (minuter)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hur lång tid kan det ta? 5 minuter? 50?"
                    value={estimatedTime}
                    onChangeText={setEstimatedTime}
                    keyboardType="numeric"
                />

                <Button title="FORTSÄTT" onPress={handleNextStep} />
            </Card>
        </ScreenLayout>
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
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary800,
        padding: Spacing.medium,
        marginBottom: Spacing.large,
        fontSize: Typography.bodyText.fontSize,
        fontWeight: Typography.bodyText.fontWeight,
        color: Typography.bodyText.color,
    },
});

export default CreateHuntScreen;
