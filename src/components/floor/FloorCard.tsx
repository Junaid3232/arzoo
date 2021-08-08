import React from 'react';
import styled from 'styled-components/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap } from 'react-native-tab-view';

const FloorCard = ({uid, title, size}) => {

    return (
        <FloorContainer size={size}>
            <FloorImage size={size}/>
            <FAIcon name="star-o" size={22} style={{ position: 'absolute', top: 5, left: 5 }} color="white" />
            <Column>
            {
                title ? <FloorTitle>Plancher stratifié Mono Serra</FloorTitle>:<></>
            }
                <RowCentered>
                    <Icon name="ios-color-palette-sharp" size={25} color={'black'} />
                    <FloorDesc></FloorDesc>
                </RowCentered>
                <RowCentered>
                    <FIcon name="dollar-sign" size={25} style={{ paddingLeft: 5, paddingRight: 2 }} color={'black'} />
                    <FloorDesc> 15$ / pi2</FloorDesc>
                </RowCentered>
                <RowCentered>
                    <MCIcon name="tape-measure" size={25} color={'black'} />
                    <FloorDesc> 6.22 po x 26 po</FloorDesc>
                </RowCentered>
            </Column>
        </FloorContainer>
    );
}

export default FloorCard;

const FloorContainer = styled.View`
    margin: ${props => props.size ? `10px 10px`:`20px 20px`};
    flex-direction: row;
`

const FloorTitle = styled.Text`
    font-size: 16px;
    font-weight: 500;
    width: 220px;
`

const FloorDesc = styled.Text`
    font-size: 14px;
    margin-left: 10px;
`

const RowCentered = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 3px;
`

const FloorImage = styled.View`
    height: ${props => props.size ? `100px`:`120px`};
    width: ${props => props.size ? `100px`:`120px`};
    background-color: brown;
    `

const Column = styled.View`
    flex-direction: column;
    margin-left: 15px;
    justify-content: center;
`