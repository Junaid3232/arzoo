import React from 'react';
import styled from 'styled-components/native';

const SplashScreen = () => {
    return (
        <Container>
        </Container>
    );
}

export default SplashScreen;

const Container = styled.SafeAreaView`
    background-color: ${props => props.theme.primary};
`;