import SettingsSwitch from 'components/user/SettingsSwitch';
import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import 'localization';
import { Text } from 'components/common/Text';
import { PrivateModeContext } from 'context/PrivateModeContext';
import { useEffect } from 'react';
import LanguageSelector from 'utils/LanguageSelector';

const SettingsScreen = () => {
    const [privateMode, setPrivateMode] = useContext<boolean>(PrivateModeContext)
    const { t } = useTranslation();
    const [privateActive, setPrivateActive] = useState(privateMode);
    const [notificationsReceiveActive, setNotificationsReceiveActive] = useState()
    const [notificationsReceivedActive, setNotificationsReceivedActive] = useState()

    //ADD STATE TO THE NETWORK CONTEXT

    useEffect(() => {
        setPrivateMode(privateActive)
    }, [privateActive])

    return (
        <Container>
            <StyledScrollView>
                <LanguageSelector />
                <SettingsSwitch
                    label={t("user:private_mode")}
                    subLabel={t("user:private_mode_text")}
                    active={privateActive}
                    setActive={setPrivateActive}
                    size="xlarge"
                    weight="600"
                />
                <SettingsSwitch
                    label={t("user:cell_data")}
                    subLabel={t("user:cell_data_details")}
                    active={privateActive}
                    setActive={setPrivateActive}
                    size="xlarge"
                    weight="600"
                />
                
                <Text size="xlarge" weight="600">{t('user:notifications')}</Text>
                <SettingsSwitch
                    marginTop={hp("1.5%")}
                    size="1.9"
                    weight="normal"
                    label={t("user:notifications_receive")}
                    active={notificationsReceiveActive}
                    setActive={setNotificationsReceiveActive}
                />
                <SettingsSwitch
                    marginTop={hp("1.5%")}
                    size="normal"
                    weight="normal"
                    label={t("user:notifications_received")}
                    active={notificationsReceivedActive}
                    setActive={setNotificationsReceivedActive}
                />
                
                <Text
                    marginTop={hp("2%")}
                    size="xlarge"
                    weight="600">
                    {t('user:support')}
                </Text>

                <Text
                    marginTop={hp("1%")}
                    size="1.9"
                    weight="normal">
                    {t('user:contact_support')}
                </Text>
                <Text
                    marginTop={hp("1%")}
                    size="1.9"
                    weight="normal">
                    support@arzo.io
                </Text>
            </StyledScrollView>
        </Container>
    );
}

export default SettingsScreen;

const Container = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.primary};;
`;

const StyledScrollView = styled.ScrollView`
    padding: ${hp("4%")}px ${wp("10%")}px;
`