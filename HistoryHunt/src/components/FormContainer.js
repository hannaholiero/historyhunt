import React from 'react';
import { View, TextInput, StyleSheet, } from 'react-native';
import { Colors } from '../constants/styles';

const FormContainer = ({ fields }) => (
    <View>
        {fields.map((field, index) => (
            <TextInput
                key={index}
                style={styles.input}
                placeholder={field.placeholder}
                value={field.value}
                onChangeText={(text) => field.onChange(field.name, text)}
                secureTextEntry={field.secureTextEntry}
                keyboardType={field.keyboardType || 'default'}
            />
        ))}
    </View>
);

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: Colors.primary500,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: Colors.primary100,
        borderRadius: 5,
    },
});

export default FormContainer;
