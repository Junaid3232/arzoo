import React, { FC, useState } from 'react';

import styled from "styled-components/native";
import { StyleSheet } from 'react-native';

import Title from '../../components/payment/Title';
import PlanTableItem from '../../components/payment/PlanTableItem';
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "components/common/Button";
import useTheme from 'hooks/useTheme';
import PaymentModeModal from '../../components/payment/PaymentModal';
import { Text } from 'components/common/Text';
const PaymentScreen: FC<{ navigation }> = ({ navigation }) => {

    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false)
    const [plan, setPlan] = useState('')

    return <Container showsVerticalScrollIndicator={false}>
        <BackgroundImage
            source={require("assets/images/arzo-bg.png")}
        />

        {/* <Title titleText={'Billing Information'} />

        <BoxTextWrapper>
            <BoxText>
                Paul Brisson{`\n`}Planchers Brisson Inc.{`\n`}514 287-2893{`\n`}{`\n`}4141 Pierre-de Coubertin Ave{`\n`}Montreal,Qc{`\n`}H1V 37
            </BoxText>
        </BoxTextWrapper>
        <AnotherBilling>
            <AnotherBillingText>Use another billing address</AnotherBillingText>
        </AnotherBilling> */}
        <ScreenTopContainer>
            <LogoContainer>
                <LogoImage source={require("../../assets/images/logo_tranpsarent_bg.png")}></LogoImage>
            </LogoContainer>
            <TopTextConatiner>
                {/* <TopBoldText>Arzo Pro Subscription</TopBoldText> */}
                <Text weight="bold" size="large">Arzo Pro Subscription</Text>
                <Text >Auto-renewable</Text>
            </TopTextConatiner>
        </ScreenTopContainer>
        <Title titleText={'Choose Plan'} />
        {plan === 'anual' ? <ChoosePlanWrapper onPress={() => setModalVisible(true)}>
            <ChoosePlanContainer>
                <TextConatiner>
                    <Text></Text>
                    {/* <PlanText> Anual Plan</PlanText> */}
                    <Text align={'left'} color={'gray'} size={'large'}>Anual Plan</Text>
                    <UnderlineText> 29.99$/mo</UnderlineText>
                    {/* <BlackText> 19.99$/mo</BlackText> */}
                    <Text size={'large'}>19.99$/mo</Text>
                </TextConatiner>
                <TextConatiner>
                    {/* <PlanText> Yearly reccuring plan of 239.88$</PlanText> */}
                    <Text size={'large'} color={'gray'} marginTop={'-10px'}>Yearly reccuring plan of 239.88$</Text>
                    {/* <GreenText> Save 20$</GreenText> */}
                    <Text color={'green'} size={'large'} marginTop={'-10px'}>Save 120$</Text>

                </TextConatiner>
            </ChoosePlanContainer>
            <IconContainer>
                <Icon name={'chevron-down'} color={'gray'} size={20} />
            </IconContainer>
        </ChoosePlanWrapper> :
            plan === 'threeMonths' ?
                <ChoosePlanWrapper onPress={() => setModalVisible(true)}>
                    <ChoosePlanContainer>

                        <TextConatiner>
                            {/* <PlanText> Three Month Plan</PlanText> */}
                            <Text align={'left'} color={'gray'} size={'large'}>Three Month Plan</Text>
                            <UnderlineText> 29.99$/mo</UnderlineText>
                            {/* <UnderlineText> 19.99$/mo</UnderlineText> */}
                            {/* <BlackText> 24.99$/mo</BlackText> */}
                            <Text size={'large'}>24.99$/mo</Text>
                        </TextConatiner>
                        <TextConatiner>
                            {/* <PlanText> Three month reccuring plan of 74.97$</PlanText>
                            <GreenText> Save 15$</GreenText> */}
                            <Text size={'large'} color={'gray'} marginTop={'-10px'}>Three month reccuring plan 74.97$</Text>
                            {/* <GreenText> Save 20$</GreenText> */}
                            <Text color={'green'} size={'large'} marginTop={'-10px'}>Save 20$</Text>
                        </TextConatiner>
                    </ChoosePlanContainer>
                    <IconContainer>
                        <Icon name={'chevron-down'} color={'gray'} size={20} />
                    </IconContainer>
                </ChoosePlanWrapper> :
                <ChoosePlanWrapper onPress={() => setModalVisible(true)}>
                    <ChoosePlanContainer>

                        <TextConatiner>
                            {/* <PlanText> Monthly Plan</PlanText> */}
                            <Text align={'left'} color={'gray'} size={'large'}>Monthly Plan</Text>
                            {/* <UnderlineText> 29.99$/mo</UnderlineText> */}
                            {/* <BlackText> 29.99$/mo</BlackText> */}
                            <Text size={'large'}>29.99$/mo</Text>
                        </TextConatiner>
                        <TextConatiner>
                            {/* <PlanText> Montly reccuring 29.99$</PlanText> */}
                            <Text size={'large'} color={'gray'} marginTop={'-10px'}>Montly reccuring 29.99$</Text>
                            {/* <GreenText> Save 20$</GreenText> */}
                        </TextConatiner>
                    </ChoosePlanContainer>
                    <IconContainer>
                        <Icon name={'chevron-down'} color={'gray'} size={20} />
                    </IconContainer>
                </ChoosePlanWrapper>}
        <PlanTableConatainer>
            <PlanTableItem titleText={'Annual Plan'} amount={239.88} />
            <Divider />
            <PlanTableItem titleText={'TPS'} amount={11.99} fontWeight={'300'} />
            <Divider />
            <PlanTableItem titleText={'TVQ'} amount={23.93} fontWeight={'300'} />
            <DividerDark />
            <PlanTableItem titleText={'Total'} amount={275.80} fontWeight={'500'} />
        </PlanTableConatainer>
        <Text size={'normal'} marginTop={'25px'} >*Fees of 239.88$ will be charged yearly every July 7th.If you cancel
            your subscription, you will have access to the Pro account until July 7th.
        </Text>
        <TermsContainer>
            <TextTouchable>
                <TextFor>Refund Policy,</TextFor>
            </TextTouchable>
            <TextTouchable>
                <TextFor>Terms of Use,</TextFor>
            </TextTouchable>
            <AndText>and</AndText>
            <TextTouchable>
                <TextFor>Privacy Policy,</TextFor>
            </TextTouchable>
        </TermsContainer>
        <ButtonContainer>
            <Button
                width={'90%'}
                onPress={() => navigation.navigate("SignIn", {
                    variant: "emailConfirmation",
                })}
            >
                Pay later
            </Button>
            <Button
                color={true}
                width={'90%'}
                marginTop={`${hp("2%")}px;`}
                marginBot={`${hp("5%")}px;`}
            >
                Pay
            </Button>
        </ButtonContainer>
        <PaymentModeModal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            setVisible={setModalVisible}
            setPlan={setPlan}
        />
    </Container>
}
export default PaymentScreen
const Container = styled.ScrollView`
padding:20px;
flex:1;
background-color: ${({ theme }) => theme.primaryGrey};
`
// const BoxTextWrapper = styled.View`
//   background-color: white;
//   width: 100%;
//   padding-horizontal:25px;
//   padding-vertical:8px;
//   border-radius: 10px;
//   margin-bottom: 25px;
//   border-width: 3px;
//   margin-top:10px;
//   border-color: ${(props) => props.theme.accent};
// `;
// const BoxText = styled.Text`
//   font-size: 13px;
//   font-weight: 500;
// `;
// const AnotherBilling = styled.View`
// width:100%;
// background-color:white;
// border-radius:8px;
// justify-content:center;
// margin-bottom:20px
// `
// const AnotherBillingText = styled.Text`
// padding:14px;
// font-size:14px;
// font-weight:500
// `
const ChoosePlanContainer = styled.View`
flex:0.95;
`
const ChoosePlanWrapper = styled.TouchableOpacity`
flex-direction:row;
width:100%;
background-color:white;
border-radius:8px;
padding:7px;
justify-content:space-between;
border-color:gray;
border-width:0.25px
margin-top:10px;
`
const TextConatiner = styled.View`
flex-direction:row;
justify-content:space-evenly;
padding-vertical:10px
`
const PlanText = styled.Text`
font-size:13px;
color:gray;
font-weight:600;
`
const GreenText = styled.Text`
font-size:13px;
color:green;
font-weight:600;
`
const BlackText = styled.Text`
font-size:13px;
color:black;
font-weight:600;
`
const UnderlineText = styled.Text`
font-size:13px;
font-weight:600;
text-decoration-line:line-through;
color:gray;
text-decoration-color:red
`
const IconContainer = styled.View`
justify-content:center;
padding-right:5px;
flex:0.1;
align-items:flex-end

`
const PlanTableConatainer = styled.View`
width:100%
border-width:0.7px;
border-color:gray;
margin-top:30px;
border-radius:8px;
padding-horizontal:10px;
padding-vertical:5px;
background-color:white;
`
const Divider = styled.View`
border-bottom-width:0.7px;
border-bottom-color:#02457A;
padding-vertical:2px
margin-bottom:2px
border-bottom-color:gray;
`
const DividerDark = styled.View`
border-bottom-width:2px;
border-bottom-color:#02457A;
padding-vertical:2px
margin-bottom:2px
border-bottom-color:black;
`
const DescriptionText = styled.Text`
padding-vertical:20px;
font-size:12px;
font-weight: 500
`
const ButtonContainer = styled.View`
padding-vertical:30px;
align-items:center
`
const ScreenTopContainer = styled.View`
flex-direction:row;
padding:5px 5px 40px 0px;
`
const LogoContainer = styled.View`
background-color:white
padding:10px
border-radius:10px
`

const LogoImage = styled.Image`
width:80px;
height:80px;
`
const TopTextConatiner = styled.View`
justify-content:center
padding-left:15px
`
// const TopBoldText = styled.Text`
// font-weight:bold;
// font-size:18px
// `

// const TopText = styled.Text`
// padding-top:8px
// `
const TermsContainer = styled.View`
flex-direction:row;
padding-top:40px;
align-items:center;
justify-content:center
`
const TextFor = styled.Text`
color:gray;
text-decoration-line:underline;
color:gray;
text-decoration-color:gray
`
const TextTouchable = styled.TouchableOpacity`
`
const AndText = styled.Text`
color:gray
padding-horizontal:3px
`
const BackgroundImage = styled.Image`
  position: absolute;
right:-400px;

  height: 620px;
  width: 620px;
`;