import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text } from 'components/common/Text';
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



const PaymentModeModal = ({ transparent, visible, setVisible, animationType, setPlan }) => {

    const { t } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();
    // const [planSelected, setPlanSelected] = useState('')



    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>

                <Window>
                    <ExitButton onPress={() => setVisible(!visible)}>
                        <Icon name="close-circle" size={20} color={theme.lightGrey} />
                    </ExitButton>

                    <ChoosePlanContainer onPress={() => {
                        setPlan('anual')
                        setVisible(false)
                    }}>
                        <TextConatiner>
                            {/* <PlanText> Anual Plan</PlanText> */}
                            <Text color={'gray'} size={'xlarge'}>Anual Plan</Text>
                            {/* <UnderlineText> 29.99$/mo</UnderlineText> */}
                            {/* <BlackText> 19.99$/mo</BlackText> */}
                            <Text size={'xlarge'}>19.99$/mo</Text>
                        </TextConatiner>
                        <TextConatiner>
                            {/* <PlanText> Yearly reccuring 239.88$</PlanText> */}
                            <Text size={'xlarge'} color={'gray'} marginTop={'-10px'}>Yearly reccuring 239.88$</Text>
                            {/* <GreenText> Save 120$</GreenText> */}
                            <Text color={'green'} size={'xlarge'} marginTop={'-10px'}>Save 120$</Text>

                        </TextConatiner>
                    </ChoosePlanContainer>

                    {/* <Divider numberOfLines={1}> _________________________________________________</Divider> */}
                    <Divider />

                    <ChoosePlanContainer onPress={() => {
                        setPlan('threeMonths')
                        setVisible(false)
                    }}>
                        <TextConatiner>
                            {/* <PlanText> Three Month Plan</PlanText> */}
                            <Text color={'gray'} size={'xlarge'} >Three Month Plan</Text>
                            {/* <UnderlineText> 24.99$/mo</UnderlineText> */}
                            {/* <BlackText> 24.99$/mo</BlackText> */}
                            <Text size={'xlarge'}>24.99$/mo</Text>
                        </TextConatiner>
                        <TextConatiner>
                            {/* <PlanText> Three month reccuring 74.97$</PlanText> */}
                            <Text size={'xlarge'} color={'gray'} marginTop={'-10px'}>Three month reccuring 74.97$</Text>
                            {/* <GreenText> Save 15$</GreenText> */}
                            <Text color={'green'} size={'xlarge'} marginTop={'-10px'}>Save 15$</Text>
                        </TextConatiner>
                    </ChoosePlanContainer>
                    <Divider />
                    {/* <Divider numberOfLines={1}> _________________________________________________</Divider> */}


                    <ChoosePlanContainer onPress={() => {
                        setPlan('oneMonth')
                        setVisible(false)
                    }}>
                        <TextConatiner>
                            {/* <PlanText> Monthly Plan</PlanText> */}
                            <Text color={'gray'} size={'xlarge'}>Monthly Plan</Text>

                            {/* <BlackText> 29.99$/mo</BlackText> */}
                            <Text size={'xlarge'}>29.99$/mo</Text>
                        </TextConatiner>
                        <TextConatiner>
                            {/* <PlanText> Monthly reccuring plan of 29.99$</PlanText> */}
                            <Text size={'xlarge'} color={'gray'} marginTop={'-10px'}>Monthly reccuring plan of 29.99$</Text>

                        </TextConatiner>
                    </ChoosePlanContainer>




                </Window>
            </Container>
        </Modal >
    );
}

export default PaymentModeModal;

const Modal = styled.Modal`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
`
const Container = styled.View`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Window = styled.View`
    width: 97%;
    padding:15px
    border-radius: 5px;
    background-color: ${props => props.theme.white};
    justify-content:space-around
    flex:0.3;
`

const ExitButton = styled.TouchableOpacity`
    position: absolute;
    right: 5px;
    top:5px;
    zIndex:1;
    `
const ChoosePlanContainer = styled.TouchableOpacity`
    margin-top:10px;`
const TextConatiner = styled.View`
    flex-direction:row;
    justify-content:space-between;
    padding:5px
    `
const PlanText = styled.Text`
    font-size:15px;
    color:gray;
    font-weight:500;
    `
const GreenText = styled.Text`
    font-size:15px;
    color:green;
    font-weight:500;
    `
const BlackText = styled.Text`
    font-size:15px;
    color:black;
    font-weight:500;
    `
const UnderlineText = styled.Text`
    font-size:15px;
    font-weight:500;
    text-decoration-line:line-through
    color:gray;
    text-decoration-color:red    
    `
const Divider = styled.View`
border-bottom-width:0.7px;
border-bottom-color:#02457A;
margin-top:10px
`