import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FormContainer from '../components/FormContainer';
import FormTextInput from '../components/FormTextInput';

const CreateHuntScreen = ({ navigation }) => {
    const [huntName, setHuntName] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [huntImage, setHuntImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setHuntImage(result.assets[0].uri);
        }
    };

    const handleContinue = () => {
        if (!huntName || !estimatedTime || !huntImage) {
            Alert.alert('Error', 'Please fill in all fields and add an image.');
            return;
        }

        navigation.navigate('InvitePlayers', { huntName, estimatedTime, huntImage });
    };

    return (
        <FormContainer>
            <FormTextInput
                placeholder="Hunt Name"
                value={huntName}
                onChangeText={setHuntName}
            />
            <FormTextInput
                placeholder="Estimated Time (e.g., 2 hours)"
                value={estimatedTime}
                onChangeText={setEstimatedTime}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {huntImage ? (
                    <Image source={{ uri: huntImage }} style={styles.image} />
                ) : (
                    <Ionicons name="image" size={100} color="gray" />
                )}
                <Text style={styles.imagePickerText}>Insert Image</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Button title="Continue" onPress={handleContinue} />
            </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    imagePickerText: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default CreateHuntScreen;
