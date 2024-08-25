import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenLayout, Card } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';
import CustomButton from '../components/common/Button';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json',
                {
                    email,
                    firstname,
                    lastname,
                    password,
                    activeHunts: {},
                    plannedHunts: {},
                    invitedHunts: {},
                    completedHunts: {},
                }
            );

            const userId = response.data.name;
            await AsyncStorage.setItem('userId', userId);
            Alert.alert('Success', 'User registered successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error registering user:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <ScreenLayout title="Skapa konto">
            <Card>
                <TextInput
                    style={styles.input}
                    placeholder="Förnamn"
                    value={firstname}
                    onChangeText={setFirstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Efternamn"
                    value={lastname}
                    onChangeText={setLastname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Lösenord"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <CustomButton title="Registrera" onPress={handleSignup} />

            </Card></ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default SignupScreen;
