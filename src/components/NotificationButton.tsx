import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather'
import { useEditMode } from 'context/ListEditModeContext';
import useTheme from 'hooks/useTheme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const NotificationButton = ({ func }) => {
    const theme = useTheme();
    const [editMode] = useEditMode()
    return (
        <>
            {
                editMode ? <></> : (
                    <Container onPress={func}>
                        <Icon name={'bell'} size={hp('3%')} color={theme.primaryDark} />
                    </Container>
                )
            }
        </>
    );
}
export default NotificationButton;
const Container = styled.TouchableOpacity`
  background-color: ${props => props.editMode ? props.theme.lightRed : props.theme.lightAccent};
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