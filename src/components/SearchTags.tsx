import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import 'localization';
import useTheme from 'hooks/useTheme';

const SearchTags = (props) => {
    const theme = useTheme();

    const {t} = useTranslation();

    const {items, itemState, setItemState} = props

    return (
        <Container {...props}>
            <DropDownPicker
            items={items}
            defaultValue={itemState}
            containerStyle={dropDownStyles.containerStyle}
            style={dropDownStyles.style}
            itemStyle={dropDownStyles.itemStyle}
            dropDownStyle={dropDownStyles.dropDownStyle}
            activeLabelStyle={{fontWeight: 'bold', color: theme.accent}}
            onChangeItem={item =>
                setItemState(item.value)
            }
            labelStyle={{ fontSize: 16, color: theme.black }}
            />
        </Container>
    );
}

export default SearchTags;

const Container = styled.View`

`;

const dropDownStyles = StyleSheet.create({
    containerStyle: {
        height: 45,
        borderColor: '#c8ced0',
        width: 180,
        margin: 10
    },
    style: {
        borderTopLeftRadius: 25, borderTopRightRadius: 25,
        borderBottomLeftRadius: 25, borderBottomRightRadius: 25
    },
    itemStyle: {
        justifyContent: 'flex-start',
    },
    dropDownStyle: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
})