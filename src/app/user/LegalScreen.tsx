import LegalView from 'components/user/LegalView';
import React from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';


const LegalScreen = () => {

    const route = useRoute();

    return (
        <Container>
            <LegalView params={route.params} />
        </Container>
    );
}

export default LegalScreen;

const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.primary};
    height: 100%;
`