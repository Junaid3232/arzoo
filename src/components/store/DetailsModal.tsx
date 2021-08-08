import React, { useState } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconButton } from 'components/common/Button';
import { useTranslation } from 'react-i18next';
import 'localization';
import { useNavigation } from '@react-navigation/native';
import { Column, Row, RowEnd, RowSpreadAround } from 'components/common/View';
import Icon from 'react-native-vector-icons/Ionicons'
import useTheme from 'hooks/useTheme';
import { Text } from 'components/common/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DetailsModal = ({ transparent, visible, setVisible, animationType }) => {

    const { t } = useTranslation();
    const theme = useTheme();

    const active = false

    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>
                <Window>
                    <HeaderRow>
                        <ExitButton onPress={() => setVisible(false)}>
                            <Icon name="close-circle" size={25} color={theme.lightGrey} />
                        </ExitButton>
                        <Row>
                            <Title size="large" weight="bold" align="center">Collection complète de planchers Flor Déco</Title>
                        </Row>
                    </HeaderRow>
                    <ContentContainer>

                        <RowSpreadAround>
                            <Column>
                                <CompanyImage
                                    resizeMode="center"
                                    source={require('assets/images/rona.png')} />
                            </Column>
                            <ColumnStart>
                                <SurfaceRow>
                                    <Icon name="layers" color={theme.accent} size={20} />
                                    <SurfaceAmount size="1.9" weight="600">120 surfaces</SurfaceAmount>
                                </SurfaceRow>
                                <Paragraph>Toute notre collection de planchers
                                    est dans cette collection.</Paragraph>
                            </ColumnStart>
                        </RowSpreadAround>
                        <TagContainer>
                            <Tag
                                weight="600"
                                size={hp('1.65%')}
                                color={theme.white}>
                                Bois Franc
                            </Tag>
                            <Tag weight="600" size={hp('1.65%')} color={theme.white}>Salon</Tag>
                            <Tag weight="600" size={hp('1.65%')} color={theme.white}>Tous les types</Tag>
                            <Tag weight="600" size={hp('1.65%')} color={theme.white}>Blanc</Tag>
                            <Tag weight="600" size={hp('1.65%')} color={theme.white}>Bois</Tag>
                        </TagContainer>
                        <TouchableOpacity>
                            <ButtonContainer active={active}>
                                <Icon name={active ? 'remove-circle' : 'add-circle'} color={theme.white} size={hp('3.2%')} />
                                <ButtonText color={theme.white} size="large" weight="600">Add to my catalog</ButtonText>
                            </ButtonContainer>
                        </TouchableOpacity>
                    </ContentContainer>
                    {/* <FloorResults /> */}
                </Window>
            </Container>
        </Modal>
    );
}

export default DetailsModal;

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
    width: ${wp("96%")}px;
    height: ${hp("90%")}px;
    border-radius: ${wp("4%")}px;
    background-color: ${props => props.theme.primary};
`

const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
    position: absolute;
    right: 0;
`

const ContentContainer = styled.View`
    margin: ${hp('1%')}px ${wp('6%')}px;
`

const HeaderRow = styled(Row)`
    background-color: ${({ theme }) => theme.primaryDarkest};
    padding-top: ${hp('4.3%')}px;
    padding-bottom: ${hp('2.5%')}px;
    border-top-left-radius: ${wp("4%")}px;
    border-top-right-radius: ${wp("4%")}px;
`

const Title = styled(Text)`
    text-align: center;
    color: ${({ theme }) => theme.white};
    width: ${wp("96%")}px;
    padding: 0 ${wp("2%")}px;
`

const Paragraph = styled(Text)`

`

const SurfaceRow = styled(Row)`
`

const TagContainer = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    margin: ${hp('1.2%')}px 0;
`

const Tag = styled(Text)`
    background-color: ${({ theme }) => theme.accent};
    padding:${hp('0.6%')}px ${wp('0.8%')}px;
    margin-bottom: ${hp('0.6%')}px;
    margin-right:${wp('0.8%')}px;
`

const SurfaceAmount = styled(Text)`
    margin-left: ${wp('1.5%')}px;
`

const CompanyImage = styled.Image`
    height: ${wp('30%')}px;
    width: ${wp('30%')}px;
    bottom: 0;
`

const ColumnStart = styled(Column)`
    justify-content: center;
    align-items: flex-start;
    width: ${wp('50%')}px;
    margin-left: ${wp('8%')}px;
`

const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? props.theme.red : props.theme.green};
    border-radius: ${hp('2.2%')}px;
    padding: ${hp('0.6%')}px ${wp('4%')}px;
    height: ${hp('5%')}px;
    
`

const ButtonText = styled(Text)`
    margin-left: ${wp('1%')}px;
`;