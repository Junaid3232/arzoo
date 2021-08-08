import React from 'react';
import styled from 'styled-components/native';
import Carousel from './Carousel';

const MyAssets = () => {
    return (
        <Container>
            <Carousel 
            style='stats'
            itemsPerInterval={3}
            items={[{
              label: 'TODAY',
              value: 1,
            }, {
              label: 'THIS WEEK',
              value: 39,
            }, {
              label: 'THIS MONTH',
              value: 120,
            }, {
              label: 'YESTERDAY',
              value: 3,
            }, {
              label: 'LAST WEEK',
              value: 25,
            }, {
              label: 'LAST MONTH',
              value: 175,
            }]}/>
        </Container>
    );
}

export default MyAssets;

const Container = styled.View`
    display: flex;
    background-color: white;
    width: 92%;
    margin: 0 auto;
    shadow-color: #000;
    shadow-opacity: 0.16;
    shadow-radius: 3px;
    margin-top: 30px;
    border-radius: 15px;
`;