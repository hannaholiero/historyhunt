import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormTextInput from './FormTextInput';

const FormContainer = ({ fields }) => {
    return (
        <View style={styles.container}>
            {fields.map((field, index) => (
                <FormTextInput
                    key={index}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChangeText={field.onChangeText}
                    secureTextEntry={field.secureTextEntry}
                    keyboardType={field.keyboardType}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default FormContainer;
