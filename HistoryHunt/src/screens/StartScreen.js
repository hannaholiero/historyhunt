import React from 'react';
import { Text } from 'react-native';
import ButtonComponent from '../components/common/Button';
import HeaderComponent from '../components/common/HeaderComponent';
import ScreenContainer from '../components/layout/ScreenContainer';

const StartScreen = ({ navigation }) => {
    return (
        <ScreenContainer>
            <HeaderComponent title="hannahs history hunt" />
            <ButtonComponent
                title="KOM IGÅNG"
                onPress={() => navigation.navigate('Login')}
            />
        </ScreenContainer>
    );
};

export default StartScreen;
