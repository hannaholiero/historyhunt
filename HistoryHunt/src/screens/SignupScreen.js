import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !firstname || !password) {
            Alert.alert('Error!', 'Vänligen fyll i alla fält');
            return;
        }
        try {
            const response = await axios.post(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/user.json',
                { email, firstname, password }
            );

            if (response.status === 200) {
                Alert.alert(
                    'Grattis!',
                    'Du är nu med i Huntfamiljen!',
                    [
                        { text: 'Logga in', onPress: () => navigation.navigate('Login') }

                    ]
                );
            } else {
                Alert.alert('Error!', 'Något gick fel, försök igen!.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert('Error', 'Användaren finns redan.');
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Name"
                value={firstname}
                onChangeText={setFirstname}
                autoCapitalize="words"
                style={{ width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={{ width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
};

export default SignupScreen;
