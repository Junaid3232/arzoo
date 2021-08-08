import useTheme from 'hooks/useTheme';
import React, { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Text } from './Text';
import { Row } from './View';
import Icon from 'react-native-vector-icons/Ionicons'

const Modal: FC<{
    children: ReactNode;
    setVisible: any;
    title: string;
    transparent: boolean;
    visible: boolean;
    animationType: any;
}> = ({
    children,
    setVisible,
    title,
    transparent,
    visible,
    animationType
}) => {
        const { t } = useTranslation();

        const theme = useTheme();
        return (
            <StyledModal transparent={transparent} visible={visible} animationType={animationType}>
                <Container>
                    <Window>
                        <Header>
                            <Row>
                                <StyledText size="large" weight="600" align="center">{title}</StyledText>
                                <ExitButton onPress={() => setVisible(false)}>
                                    <Icon name="close-circle" size={25} color={theme.lightGrey} />
                                </ExitButton>
                            </Row>
                        </Header>
                        <Content>
                            <Div>

                            {children}
                            </Div>
                        </Content>
                    </Window>
                </Container>
            </StyledModal>
        );
    }

export default Modal;

const StyledModal = styled.Modal`
    
`

const Container = styled.View`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const Window = styled.View`
    width: ${wp('90%')};
    border-radius: 15px;
    background-color: ${props => props.theme.white};
`

const Header = styled.View`

`

const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
    position: absolute;
    right: 0;
`

const StyledText = styled(Text)`
    align-self: center;
    width: 100%;
    margin-top: ${hp('1%')}px;
`

const Content = styled.View`
    align-items: center;
    justify-content: center;
    margin: ${hp('2%')}px ${wp('5%')}px;`

const Div = styled.View`

`