import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import axios from 'axios';
const logo = require("../assets/logo.png");
import FormContainer from '../components/FormContainer';
import FormTextInput from '../components/FormTextInput';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
    const [email, setEmail] = useState('test@test.test');
    const [password, setPassword] = useState('test');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/user.json'
            );

            const users = response.data;
            let userFound = false;

            for (const userId in users) {
                const userData = users[userId];

                if (userData.email === email) {
                    userFound = true;
                    if (userData.password === password) {
                        Alert.alert('Success', 'User signed in!');
                        onLoginSuccess(); // Uppdatera autentiseringsstatus
                        navigation.navigate('Home');
                        break;
                    } else {
                        Alert.alert('Error', 'Incorrect password.');
                        break;
                    }
                }
            }

            if (!userFound) {
                Alert.alert('Error', 'User not found.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.image} resizeMode='contain' />
            </View>
            <FormTextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <FormTextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="Log In" onPress={handleLogin} disabled={isLoading} />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Gå till Registrering"
                    onPress={() => navigation.navigate('Signup')}
                    disabled={isLoading}
                />
            </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
    },
});

export default LoginScreen;