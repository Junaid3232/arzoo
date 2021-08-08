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
import useTheme from 'hooks/useTheme';
import { Text } from 'components/common/Text';

const LegalModal = ({ transparent, visible, setVisible, animationType }) => {

    const { t } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToLegal = (params) => {
        navigation.navigate('Legal', params)
        setVisible(false)
    }

    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>
                <Window>
                    <Row>
                        <StyledText size="xlarge" weight="600" align="center">{t('user:legal')}</StyledText>
                        <ExitButton onPress={() => setVisible(false)}>
                            <Icon name="close-circle" size={25} color={theme.lightGrey} />
                        </ExitButton>
                    </Row>
                    <ButtonContainer>
                        <IconButton rounded={true} variant="legal" icon="book" title={t('user:terms_of_use')} func={() => navigateToLegal('terms_use')} bgColor={theme.primary} />
                        <IconButton rounded={true} variant="legal" icon="lock-closed" title={t('user:privacy_policy')} func={() => navigateToLegal('privacy_policy')} bgColor={theme.primary} />
                    </ButtonContainer>
                </Window>
            </Container>
        </Modal>
    );
}

export default LegalModal;

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
`

const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
    position: absolute;
    right: 0;
`

const ButtonContainer = styled.View`
    padding: 0 ${wp('4%')}px;
`

const StyledText = styled(Text)`
    align-self: center;
    width: 100%;
    margin-top: ${hp('1%')}px;
`