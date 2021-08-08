import React, { useState } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconButton } from 'components/common/Button';
import { useTranslation } from 'react-i18next';
import 'localization';
import { useNavigation } from '@react-navigation/native';
import { Column, Row, RowEnd, RowJustifyCentered } from 'components/common/View';
import Icon from 'react-native-vector-icons/Ionicons'
import useTheme from 'hooks/useTheme';
import { Text } from 'components/common/Text';
import Button from 'components/common/Button';

const SubscriptionModal = ({ transparent, visible, setVisible, animationType }) => {

    const { t } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();

    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>
                <Window>
                    <Row>
                        <ExitButton onPress={() => setVisible(false)}>
                            <Icon name="close-circle" size={25} color={theme.lightGrey} />
                        </ExitButton>
                    </Row>
                    <ContentContainer>
                        <Icon name="construct" size={45} color={theme.lightAccent} />
                        <Title size="xlarge" weight="bold">Vous avez un accès limité!</Title>
                        <Paragraph>Afin d’ajouter des collections, vous pouvez devenir un membre PRO ou vous pouvez demander à un membre PRO de vous envoyer une liste de planchers pour une durée limitée.</Paragraph>
                    </ContentContainer>
                    <RowJustifyCentered>
                        <Button width={`${wp("65%")}px`} color={theme.accent} marginTop={`${hp("0%")}px;`} marginBot={`${hp("3%")}px;`}>Activer mon Compte PRO</Button>
                    </RowJustifyCentered>
                </Window>
            </Container>
        </Modal>
    );
}

export default SubscriptionModal;

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
    background-color: ${props => props.theme.primary};
`

const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
    position: absolute;
    right: 0;
`

const ContentContainer = styled(Column)`
    margin: ${hp('4%')}px ${wp('6%')}px;
`

const Title = styled(Text)`
    margin: ${hp('2%')}px 0px;
`

const Paragraph = styled(Text)`

`