import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const FormTextInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
});

export default FormTextInput;
