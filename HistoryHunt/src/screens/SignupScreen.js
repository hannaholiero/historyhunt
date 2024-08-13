import React, { useState } from 'react';
import { Button, View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import FormTextInput from '../components/FormTextInput';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            // Hantera användarregistrering via API
            await axios.post(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/user.json',
                { email, password }
            );
            Alert.alert('Success', 'User registered successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error registering user:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
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
            <FormTextInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="Sign Up" onPress={handleSignup} disabled={isLoading} />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Back to Login"
                    onPress={() => navigation.navigate('Login')}
                    disabled={isLoading}
                />
            </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
    },
});

export default SignupScreen;
