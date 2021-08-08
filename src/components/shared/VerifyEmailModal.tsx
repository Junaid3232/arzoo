import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import { Text } from 'components/common/Text';
import { FlexCentered, View } from 'components/common/View';
import styled, { css } from "styled-components/native";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const VerifyEmailModal = ({ setVisible, transparent, animationType, visible }) => {
    const { t } = useTranslation();
    return (
        <Modal title={t('')} setVisible={setVisible} transparent={transparent} animationType={animationType} visible={visible}>
            <Text>{t('authentication:confirm_email')}</Text>
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

export default VerifyEmailModal;

const TextWrapper = styled(FlexCentered)`
    margin-top: ${hp("1%")}px;
`;