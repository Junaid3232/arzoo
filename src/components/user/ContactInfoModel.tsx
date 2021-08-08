import React from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import 'localization';
import Icon from 'react-native-vector-icons/Ionicons'
import useTheme from 'hooks/useTheme';
import { ActivityIndicator } from 'react-native-paper';

const ContactInfoModel = ({ transparent, visible, setVisible, animationType, removeContact, item, modelLoading, variant, addContact }) => {
    const { t } = useTranslation();
    const theme = useTheme()
    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>
                <Window>
                    <ExitButton onPress={() => setVisible(false)}>
                        <Icon name="close-circle" size={25} color={theme.lightGrey} />
                    </ExitButton>
                    <ButtonContainer>
                        <RowContainer>
                            <AvatarContainer>
                                <Avatar source={require('../../assets/images/floor_example_1.jpg')}></Avatar>
                            </AvatarContainer>
                            <NameContainer>
                                <Name>{item?.name}</Name>
                                <UserNameContainer>{`@${item?.userName}`}</UserNameContainer>
                            </NameContainer>

                        </RowContainer>
                        {/* <Description>{t("user:contact_since")}{" October 1st 2020"}</Description> */}
                        {variant === 'added' ?
                            <ButtonRemove onPress={removeContact}>
                                {modelLoading ? <LoadingAnimation loading={modelLoading} size="small" color={"white"} /> :
                                    <ButtonText>{t('user:remove_contact')}</ButtonText>}
                            </ButtonRemove> :
                            <Button onPress={addContact}>
                                {modelLoading ? <LoadingAnimation loading={modelLoading} size="small" color={"white"} /> :
                                    <ButtonText>{t('user:add_contact')}</ButtonText>}
                            </Button>
                        }
                    </ButtonContainer>

                </Window>
            </Container>
        </Modal>
    );
}

export default ContactInfoModel;

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
    width: ${wp("67%")}px;
    border-radius: ${wp("4%")}px;
    background-color: ${props => props.theme.white};
    
`

const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
    position: absolute;
    right: 0;
`

const ButtonContainer = styled.View`
    padding: 0 ${wp('4%')}px;
    margin-top:${wp('6%')}px;
    padding-bottom:${wp('5%')}px;
    margin-left:${wp('2%')}px;
    
`
const AvatarContainer = styled.View`

`
const Button = styled.TouchableOpacity`
width:95%;
height:43px
background-color: ${({ theme }) => theme.accent};
border-radius: 7px;
justify-content:center;
align-self:center
align-items:center
margin-top:20px

`
const ButtonRemove = styled.TouchableOpacity`
width:95%;
height:43px
background-color: ${({ theme }) => theme.red};
border-radius: 7px;
justify-content:center;
align-self:center
align-items:center
margin-top:20px
`
const UserNameContainer = styled.Text`
`
const Name = styled.Text`
font-size:17px;
font-weight:bold
`
const NameContainer = styled.View`
align-self:center;
margin-left:15px
`
const Avatar = styled.Image`
width: 55px;
height: 55px;
border-radius: 27px;
`
const ButtonText = styled.Text`
color : white;
font-weight: bold;
font-size:15px
`
const Description = styled.Text`
font-size: 11px
padding-vertical:14px
align-self:center
`
const RowContainer = styled.View`
flex-direction: row;
`
const LoadingAnimation = styled(ActivityIndicator)`
    display: ${props => props.loading ? 'flex' : 'none'};
    height: 100%;
    width: 100%;
`