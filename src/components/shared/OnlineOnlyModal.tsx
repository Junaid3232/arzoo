import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import { Text } from 'components/common/Text';
import { FlexCentered, View } from 'components/common/View';
import styled, { css } from "styled-components/native";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const OnlineOnlyModal = ({ setVisible, transparent, animationType, visible, isConnected }) => {
    const { t } = useTranslation();

    const setVisibility = () => {
        if(!isConnected){
            setVisible(true)
        }
    }

    useEffect(()=> {
        setVisibility()
    }, [])
    return (
        <Modal title={t('internet_connection_required')} setVisible={setVisible} transparent={transparent} animationType={animationType} visible={visible}>
            <Text>{t('app_online_only')} {t('future_update_online')}</Text>
            <TextWrapper>
                <Button
                    color={true}
                    top={true}
                    onPress={() => setVisible(false)}
                    width={`${wp('30%')}px`}
                    variant="small">{t('close')}</Button>
            </TextWrapper>
        </Modal>
    );
}

export default OnlineOnlyModal;

const TextWrapper = styled(FlexCentered)`
    margin-top: ${hp("1%")}px;
`;