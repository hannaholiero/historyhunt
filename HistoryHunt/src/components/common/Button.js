import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonStyles, Spacing } from '../../constants/Theme';

const CustomButton = ({ title, onPress, style = {}, textStyle = {}, variant = 'primary' }) => {
    const buttonStyle = ButtonStyles[variant] || ButtonStyles.primary;

    return (
        <TouchableOpacity
            style={[buttonStyle, style]}
            onPress={onPress}
        >
            <Text style={[ButtonStyles.text, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;