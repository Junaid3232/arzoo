import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather'
import { useEditMode } from 'context/ListEditModeContext';
import useTheme from 'hooks/useTheme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

const ModifyListButton = () => {
    const theme = useTheme();

    const {t} = useTranslation();

    const [editMode, setEditMode] = useEditMode();

    return (
        <Container editMode={editMode} onPress={() => setEditMode(!editMode)}>
            <Icon name="edit" size={hp('3%')} color={theme.primaryDark} />
            {
                editMode ? (
                    <EditTitle>{t('modify_list')}</EditTitle>
                ) : (
                    <></>
                )
            }
        </Container>
    );
}

export default ModifyListButton;

const Container = styled.TouchableOpacity`
  background-color: ${props => props.editMode ? props.theme.lightAccent : props.theme.lightAccent};
  width: ${props => props.editMode ? 'auto' : '60px'};
  flex: ${props => props.editMode ? '1' : '0 1 auto'};
  height: ${hp('6%')};
  border-width: 0.25px;
  border-radius: ${hp('1.2%')};
  border-color: ${props => props.theme.borderColor};
  align-items: center;
  justify-content: center;
  margin-left: ${props => props.editMode ? '0' : '10px'};
  flex-direction: row;
`;

const EditTitle = styled.Text`
    color: ${props => props.theme.primaryDark};
    font-weight: 600;
    font-size: ${hp('2.2%')};
    margin: 0 ${wp('5%')}px;
`