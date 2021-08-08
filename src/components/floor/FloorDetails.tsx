import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import FloorCard from './FloorCard';

const FloorDetails = (props) => {
    return (
        <Container {...props}>
            <FloorCard size={'small'}/>
        </Container>
    );
}
export default FloorDetails;

const windowWidth = Dimensions.get('window').width;

const tileWidth = windowWidth / 3 - 9

const Container = styled.View`
    width: 100%;
    height: ${tileWidth}px;
    justify-content: center;
`;
