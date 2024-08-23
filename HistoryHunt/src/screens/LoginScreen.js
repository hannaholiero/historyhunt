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

    // const handleLogin = async () => {
    //     try {
    //         // Hämta alla användare från Firebase
    //         const response = await axios.get(
    //             'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json'
    //         );

    //         const users = response.data;
    //         let userFound = false;

    //         // Iterera över alla användare och kontrollera om e-post och lösenord matchar
    //         for (const userId in users) {
    //             const userData = users[userId];
    //             if (userData.email === email && userData.password === password) {
    //                 userFound = true;
    //                 // Spara användarens e-post i AsyncStorage
    //                 await AsyncStorage.setItem('userEmail', email);
    //                 // Navigera till HomeScreen
    //                 navigation.navigate('Home');
    //                 break;
    //             }
    //         }

    //         if (!userFound) {
    //             Alert.alert('Error', 'Invalid email or password.');
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         Alert.alert('Error', 'An error occurred during login. Please try again later.');
    //     }
    // };
    const handleLogin = async () => {
        try {
            const response = await axios.get(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            );

            const users = response.data;
            console.log('Users fetched:', users); // Logga alla användare

            let userFound = false;

            for (const userId in users) {
                const userData = users[userId];
                console.log('Checking user:', userData); // Logga varje användare
                if (userData.email === email && userData.password === password) {
                    userFound = true;
                    await AsyncStorage.setItem('userEmail', email);
                    await AsyncStorage.setItem('userId', userId); // Spara användar-ID

                    navigation.navigate('Home');
                    break;
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
                    { placeholder: 'Enter your email', value: email, onChange: setEmail, keyboardType: 'email-address' },
                    { placeholder: 'Enter your password', value: password, onChange: setPassword, secureTextEntry: true },
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
