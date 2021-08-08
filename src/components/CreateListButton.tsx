import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useContext } from 'react';
import { useEditMode } from 'context/ListEditModeContext';
import { useNavigation } from '@react-navigation/native';
import useTheme from 'hooks/useTheme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { FilterContext } from 'context/FilterContext';

const CreateListButton = ({ }) => {
    const [ // from context
        searchFloorType,
        setSearchFloorType,
        searchFloorStore,
        setSearchFloorStore,
        addedFloors,
        setAddedFloors,
        searchFloorColor,
        setSearchFloorColor,
        getSelectedListId,
        setGetSelectedListId,
    ] = useContext<any>(FilterContext)
    const theme = useTheme()
    const { t } = useTranslation();
    //Global States
    const navigation = useNavigation()
    const [editMode] = useEditMode()
    return (
        <>
            {
                editMode ? <></> : (
                    <Container onPress={() => {
                        navigation.navigate('List', { storedListId: null, editList: false, createNewList: true })
                        setAddedFloors(false)
                    }}>
                        <Icon name={'add'} size={hp('4%')} color={theme.lightGrey} />
                        <CustomText>{t('create_list')}</CustomText>
                    </Container>
                )
            }

        </>
    );
}
export default CreateListButton;
const Container = styled.TouchableOpacity`
    background-color: ${props => props.theme.lighterBlueGrey};
    flex: 1;
    border-radius: ${hp('1.2%')};
    height: ${hp('6%')};
    border-width: 0.25px;
    border-color: ${props => props.theme.borderColor};
    padding: 0 ${wp('3%')}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const CustomText = styled.Text`
    color: ${props => props.theme.lightGrey};
    font-weight: 600;
    font-size: ${hp('1.7%')};
    margin-left: ${wp('2%')}px;
`;
