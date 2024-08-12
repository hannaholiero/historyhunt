import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios'; // Glöm inte att importera axios
const logo = require("../assets/logo.png");

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to handle loading feedback

    const handleLogin = async () => {
        setIsLoading(true); // Start loading

        try {
            // Hämta alla användare
            const response = await axios.get(
                'https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app/user.json'
            );

            const users = response.data;
            let userFound = false;

            // Iterera över alla användare med for...in loop
            for (const userId in users) {
                const userData = users[userId];

                // Jämför e-postadressen och lösenordet
                if (userData.email === email) {
                    userFound = true;
                    if (userData.password === password) {
                        Alert.alert('Success', 'User signed in!');
                        // Navigera till huvudskärmen eller startskärmen
                        // navigation.navigate('Home'); // Förutsätter att du har en skärm som heter "Home"
                        console.log("Success");
                        break; // Avsluta loopen när rätt användare har loggats in
                    } else {
                        Alert.alert('Error', 'Incorrect password.');
                        break; // Avsluta loopen när lösenordet är fel
                    }
                }
            }

            if (!userFound) {
                Alert.alert('Error', 'User not found.');
            }
        } catch (error) {
            console.error('Error fetching user:', error); // Logga felmeddelandet
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hannahs History Hunt</Text>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.text}>Logga in</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none" // Se till att detta är inställt för att undvika oönskad kapitalisering
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password"
                secureTextEntry
            />
            <Button title="Log In" onPress={handleLogin} disabled={isLoading} />
            <Button
                title="Gå till Registrering"
                onPress={() => navigation.navigate('Signup')}
                disabled={isLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#fbf5e9",
    },
    title: {
        fontSize: 24,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
    },
    image: {
        width: '50%',
        height: '50%',
    },
});

export default LoginScreen;
