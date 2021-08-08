import React from 'react';
import styled from 'styled-components/native';
import { Column, Row, RowCentered } from 'components/common/View';
import { Text } from 'components/common/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SubDetailsTable = ({ accountType }) => {
    return (
        <>
            {accountType == 'pro' || accountType == 'admin' ? (
                <Container>
                    <Header>
                        <Text color="white" weight="bold">Vous avez accès à:</Text>
                    </Header>
                    <TextBlock>
                        <StyledText weight="bold">• Usage d’échantillons pour la démonstration à vos clients</StyledText>
                        <StyledText weight="bold">• Usage illimité de toutes les surfaces</StyledText>
                        <StyledText weight="bold">• Visualisation de plus de 10 000 planchers de centaines de fabriquants du Québec</StyledText>
                        <StyledText weight="bold">• Partage de planchers avec vos clients afin qu’ils puissent visualiser les planchers sans vous déplacer!</StyledText>
                    </TextBlock>
                </Container>
            ) : (
                <Container>
                    <Header>
                        <Text color="white" weight="bold">Vous aurez accès à:</Text>
                    </Header>
                    <TextBlock>
                        <StyledText weight="bold">• Évitez l’usage d’échantillons pour la démontrer vos planchers à vos clients!</StyledText>
                        <StyledText weight="bold">• Usage illimité de toutes les surfaces</StyledText>
                        <StyledText weight="bold">• Visualisez plus de 10 000 planchers de centaines de fabriquants du Québec</StyledText>
                        <StyledText weight="bold">• Partagez des planchers avec vos clients afin qu’ils puissent visualiser les planchers sans vous déplacer!</StyledText>
                        <SubscriptionPrice weight="bold" size={`${hp("3%")}px`}>À partir de 19,99$ / mois</SubscriptionPrice>
                    </TextBlock>
                </Container>
            )}

        </>
    );
}

export default SubDetailsTable;

const Container = styled(Column)`
    border-radius: ${wp("3.5%")};
    background-color: ${({ theme }) => theme.primaryGrey};
    width: ${wp("85%")}px;
    margin-bottom: ${hp("2.5%")}px;
`;

const Header = styled(Row)`
    background-color: ${({ theme }) => theme.primaryDark};
    border-top-left-radius: ${wp("3.5%")}px;
    border-top-right-radius: ${wp("3.5%")}px;
    width: ${wp("85%")}px;
    justify-content: center;
    padding: ${hp("0.5%")}px;
`

const TextBlock = styled.View`
    padding: ${hp("2%")}px 0px;
`

const StyledText = styled(Text)`
    padding: ${hp("0.5%")}px ${hp("2%")}px;
`

const SubscriptionPrice = styled(Text)`
    margin-top: ${hp("5%")}px;
    text-align: center;
`