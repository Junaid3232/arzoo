import React from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconButton } from 'components/common/Button';
import { useTranslation } from 'react-i18next';
import 'localization';
import { useNavigation } from '@react-navigation/native';
import { Row, RowEnd } from 'components/common/View';
import Icon from 'react-native-vector-icons/Ionicons'
import IIcon from 'react-native-vector-icons/FontAwesome5'
import useTheme from 'hooks/useTheme';
import { Text } from 'components/common/Text';

const PrivateModeModal = ({ transparent, visible, setVisible, animationType }) => {

    const { t } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();



    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>

                <Window>
                    <ExitButton onPress={() => setVisible(!visible)}>
                        <Icon name="close-circle" size={25} color={theme.lightGrey} />
                    </ExitButton>
                    <Row>

                        <ModalIconContainer>
                            <IIcon name="user-secret" size={45} color={theme.accent} />
                        </ModalIconContainer>

                    </Row>
                    <ButtonContainer>
                        <Text
                            size={'xlarge'}
                            weight={'bold'}
                            align={'center'}
                        >Private Mode is Active</Text>
                        <Text
                            align={'center'}
                            size={'normal'}>In order to access this feature you{`\n`}need to disable private mode</Text>

                    </ButtonContainer>
                    <Button onPress={() => {
                        navigation.navigate('Settings')
                        setVisible(false)
                    }}
                    >
                        <Text
                            color={'white'}
                            size={'large'}
                            weight={'bold'}
                        >Go to settings</Text>
                    </Button>

                </Window>
            </Container>
        </Modal>
    );
}

export default PrivateModeModal;

const Modal = styled.Modal`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
   
`

const Container = styled.View`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
   
`

const Window = styled.View`
    width: ${wp("80%")}px;
    border-radius: ${wp("4%")}px;
    background-color: ${props => props.theme.white};
    justify-content:space-around
    flex:0.3;
    padding-vertical:10px;
`

const ExitButton = styled.TouchableOpacity`
   
    position: absolute;
    right: 5px;
    top:5px;
    zIndex:1
`

const ButtonContainer = styled.View`

`

const StyledText = styled(Text)`
    align-self: center;
    width: 100%;
    margin-top: ${hp('1%')}px;
    font-weight:600;
    font-size:22px;
    text-align:center
    margin-top:-20px
`
const ModalIconContainer = styled.View`
align-self: center;
align-items:center;
justify-content:center;
flex:1
`
const ModalText = styled.Text`
text-align:center;
font-size:16px;
font-weight:400;

`
const Button = styled.TouchableOpacity`
align-items:center
background-color: ${({ theme }) => theme.accent};

justify-content:center
align-self:center
width:80%
padding-vertical:10px;
border-radius:10px
`
const ButtonText = styled.Text`
color:white
font-size:18px
`