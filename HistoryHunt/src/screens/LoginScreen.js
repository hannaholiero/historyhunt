import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('Test3@test.test');
    const [password, setPassword] = React.useState('test');

    const handleLogin = async () => {
        try {
            console.log('Email in state:', email);
            console.log('Password in state:', password);

            if (!email || !password) {
                Alert.alert('Error', 'Please enter both email and password.');
                return;
            }

            const response = await axios.get(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            );

            const users = response.data;
            console.log('Users fetched:', users); // Logga alla användare

            let userFound = false;

            for (const userId in users) {
                const userData = users[userId];

                if (userData.email && userData.password) {
                    const userEmail = userData.email.trim().toLowerCase();
                    const userPassword = userData.password;

                    if (userEmail === email.trim().toLowerCase() && userPassword === password) {
                        userFound = true;
                        const firstname = userData.firstname || 'Unknown'; // Försäkra oss om att firstname alltid har ett värde

                        await AsyncStorage.setItem('email', email);
                        await AsyncStorage.setItem('userId', userId); // Spara användar-ID
                        await AsyncStorage.setItem('firstname', firstname); // Spara förnamnet

                        console.log('Login successful:', firstname);
                        navigation.navigate('Home');
                        break;
                    } else {
                        console.log('No match for:', userEmail);
                    }
                } else {
                    console.log('User data missing email or password:', userData);
                }
            }

            if (!userFound) {
                Alert.alert('Error', 'Invalid email or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login. Please try again later.');
        }
    };


    return (
        <View style={styles.container}>
            <FormContainer
                fields={[
                    { placeholder: 'Enter your email', value: email, onChangeText: setEmail, keyboardType: 'email-address' },
                    { placeholder: 'Enter your password', value: password, onChangeText: setPassword, secureTextEntry: true },
                ]}
            />
            <CustomButton title="Login" onPress={handleLogin} />
            <CustomButton title="Don't have an account? Sign up" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: Colors.primary100,
    },
});

export default LoginScreen;
