import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import useTheme from 'hooks/useTheme';
import { useNavigation } from '@react-navigation/core';
import { Column, RowEnd, View } from 'components/common/View';
import { Text } from 'components/common/Text';
import SubDetailsTable from 'components/user/SubDetailsTable';
import Button from 'components/common/Button';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const SubscriptionScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    let accountType = route.params
    return (
        <Container>
            <ScrollView>
            <RowEnd>
                <ExitButton onPress={() => navigation.goBack()}>
                    <Icon name="close-circle" size={35} color={theme.lightGrey} />
                </ExitButton>
            </RowEnd>
            {
                accountType == 'pro' || accountType == 'admin'? (
                    <StyledColumn>
                        <StyledView>
                            <Text marginBot={`${hp("1.2%")}px`} size={`${hp("3%")}px`} weight="bold">Vous êtes un PRO</Text>
                            <IconContainer>
                                <StarContainer>
                                    <Icon name="star" size={20} color={theme.yellow} />
                                </StarContainer>
                                <Icon name="construct" size={45} color={theme.lightAccent} />
                            </IconContainer>
                            <SubDetailsTable accountType={accountType} />
                        </StyledView>
                        <BottomContainer>
                            <Text weight="bold">Si vous désactivez votre compte PRO aujourd’hui vous ne serez plus chargés mensuellement et vous aurez accès aux bénéfices de l’abonnement Pro jusqu’au :
                            </Text>
                            <Text marginTop={`${hp("0.5%")}px`} color={theme.grey}>14 Août 2021 (inclusivement)</Text>
                            <Button marginTop={`${hp("1%")}px;`} color={false} marginBot={`${hp("2%")}px;`} width={`${wp('70%')}px`}>Déactiver mon Compte PRO</Button>
                            <Text marginTop={`${hp("0%")}px`} size={`${hp("1.5%")}px`} color={theme.grey}>Terms of Use and Privacy Policy</Text>
                        </BottomContainer>
                    </StyledColumn>
                ) : (
                    <StyledColumn>
                        <IconContainer>
                            <StarContainer>
                                <Icon name="star" size={20} color={theme.yellow} />
                            </StarContainer>
                            <Icon name="construct" size={45} color={theme.lightAccent} />
                        </IconContainer>
                        <Text marginBot={`${hp("1.2%")}px`} size={`${hp("3%")}px`} weight="bold">Devenez un PRO</Text>
                        <SubDetailsTable accountType={accountType} />
                        <Button color={true} marginTop={`${hp("1%")}px;`} marginBot={`${hp("2%")}px;`}>Activer mon Compte PRO</Button>
                        <Text marginTop={`${hp("0%")}px`} size={`${hp("1.5%")}px`} color={theme.grey}>Terms of Use and Privacy Policy</Text>
                    </StyledColumn>
                )
            }
            </ScrollView>
        </Container>
    );
}

export default SubscriptionScreen;

const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.primary};
    height: 100%;
`;

const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
`

const StyledColumn = styled(Column)`
    width: ${wp("90%")}px;
    align-self: center;
    justify-content: space-between;
    height: 100%;
`

const IconContainer = styled.View`
    background-color: white;
    padding: ${wp("3.5%")}px;
    border-radius: 10px;
    margin-bottom:${hp("3%")}px;
`

const StarContainer = styled.View`
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 10;
`

const StyledView = styled(Column)`

`

const BottomContainer = styled(Column)`
    margin-top: -${hp("6%")}px;
`