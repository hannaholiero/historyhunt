import React from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../components/common/Button';
import { ScreenLayout, Card } from '../components/layout/Layout';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

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
            console.log('Users fetched:', users);

            let userFound = false;

            for (const userId in users) {
                const userData = users[userId];

                if (userData.email && userData.password) {
                    const userEmail = userData.email.trim().toLowerCase();
                    const userPassword = userData.password;

                    if (userEmail === email.trim().toLowerCase() && userPassword === password) {
                        userFound = true;
                        const firstname = userData.firstname || 'Unknown';

                        await AsyncStorage.setItem('email', email);
                        await AsyncStorage.setItem('userId', userId);
                        await AsyncStorage.setItem('firstname', firstname);

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

        <ScreenLayout title="Login">
            <Card>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View style={styles.buttonRow}>
                    <CustomButton title="Login" onPress={handleLogin} style={styles.button} />
                    <CustomButton title="Sign up" onPress={() => navigation.navigate('Signup')} style={styles.button} />
                </View>
            </Card>
        </ScreenLayout>

    );
};

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary800,
        padding: Spacing.medium,
        marginBottom: Spacing.large,
        fontSize: Typography.bodyText.fontSize,
        fontWeight: Typography.bodyText.fontWeight,
        color: Typography.bodyText.color,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // För att fördela utrymme jämnt mellan knapparna
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: Spacing.small, // Lägg till lite utrymme mellan knapparna
    },
});

export default LoginScreen;
