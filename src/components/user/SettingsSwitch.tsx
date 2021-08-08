import { Text } from 'components/common/Text';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RowSpreadBetween } from 'components/common/View';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'react-i18next';
import 'localization';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FC } from 'react';

interface SettingsSwitchProps {
    label: string,
    subLabel?: string,
    active: any,
    setActive: any,
    size: string,
    weight: string,
    marginTop?: any
}

const SettingsSwitch: FC<SettingsSwitchProps> = ({ label, subLabel, active, setActive, size, weight, marginTop }) => {
    const theme = useTheme();

    return (
        <Container marginTop={marginTop}>
            <RowSpreadBetween>
                <Label size={size} weight={weight}>{label}</Label>
                <Switch
                    onValueChange={() => setActive(!active)}
                    value={active}
                    trackColor={{ false: "#DDDFDF", true: "#A6DBEF" }}
                    thumbColor={active ? "#018ABE" : "#97CADB"}
                />
            </RowSpreadBetween>
            <SubLabel shown={subLabel}>
                {subLabel}
            </SubLabel>
        </Container>
    );
}

export default SettingsSwitch;

const Container = styled.SafeAreaView`
    margin-top: ${props => props.marginTop ? `${props.marginTop}px` : '0px'};;
    z-index: -1;
`;

const Label = styled(Text)`
    width: ${wp("60%")}px;
`

const Switch = styled.Switch`

`

const SubLabel = styled(Text)`
    display: ${props => props.shown ? 'flex' : 'none'};
    margin:${hp("2%")}px 0px;
`

const SubOption = styled(RowSpreadBetween)`
    margin-top: ${hp("1.5%")}px;
`;