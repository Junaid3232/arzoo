import { Text } from 'components/common/Text';
import { View } from 'components/common/View';
import React from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';
import useTheme from 'hooks/useTheme';


const SplashScreen = () => {

    const theme = useTheme();
    return (
        <SplashView>
            <Logo source={require('assets/images/logo_tranpsarent_bg.png')} />
            <ActivityIndicator size={35} color={theme.accent}/>
        </SplashView>
    );
}

export default SplashScreen;

const SplashView = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.primary};;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 40px;
`