import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import ButtonComponent from '../components/common/Button';
import StartLogo from '../../assets/StartLogo.png';
import ScreenContainer from '../components/layout/ScreenContainer';
import { ContainerStyles, Typography, Spacing, Colors } from '../constants/Theme';

const StartScreen = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Image source={StartLogo} style={styles.logo} />
            <ButtonComponent
                title="KOM IGÅNG"
                onPress={() => navigation.navigate('Login')}
            />
        </ScreenContainer>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    logo: {
        width: 500,
        height: 500,
        resizeMode: 'contain',
        alignSelf: 'center',

    },
});

