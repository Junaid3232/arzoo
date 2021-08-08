import React from 'react';
import styled from 'styled-components/native';

const CatalogTag = ({children}) => {
    return (
        <Container>
            <TagText>{children}</TagText>
        </Container>
    );
}

export default CatalogTag;

const Container = styled.View`
    padding: 3px 5px;
    background-color: ${props => props.theme.lightAccent};
    margin: 2px;
    align-items: center;
    justify-content: center;
`

const TagText = styled.Text`
    font-weight: 600;
`