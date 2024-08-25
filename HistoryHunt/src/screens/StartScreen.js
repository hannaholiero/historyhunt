import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import ButtonComponent from '../components/common/Button';
import StartLogo from '../../assets/StartLogo.png'; // Justera sökvägen 
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
        width: 500,  // Ställ in bredden som du vill ha
        height: 500,  // Ställ in höjden som du vill ha
        resizeMode: 'contain', // Så att bilden skalar proportionerligt
        alignSelf: 'center', // Centrerar bilden horisontellt

    },
});

