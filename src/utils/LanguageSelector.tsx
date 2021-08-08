import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import SettingsSwitch from 'components/user/SettingsSwitch';
import DropDownPicker from 'react-native-dropdown-picker';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useTheme from 'hooks/useTheme';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Flex } from 'components/common/View';
import { Text } from 'components/common/Text';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const LANGS = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
];


const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const selectedLngCode = i18n.language;
  const setLng = (lngCode: string) => i18n.changeLanguage(lngCode);
  return (
    <FlexRowSpaceBetween>
      <Text size="xlarge" weight="600">{t('language')}</Text>
      <DropDownPicker
        items={LANGS}
        defaultValue={selectedLngCode}
        containerStyle={dropDownStyles.containerStyle}
        style={dropDownStyles.style}
        itemStyle={dropDownStyles.itemStyle}
        dropDownStyle={dropDownStyles.dropDownStyle}
        onChangeItem={(item) => {
          console.log(item)
          setLng(item.value)
        }}
        labelStyle={{ fontSize: hp("2.2%"), color: '#000000' }}
      />
    </FlexRowSpaceBetween>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgb(231, 232, 235)',
    width: width * 0.8,
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  select: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedRow: {
    backgroundColor: 'rgb(45, 45, 45)',
  },
  selectedText: {
    color: 'rgb(231, 232, 235)',
  },
  text: {
    color: 'rgb(45, 45, 45)',
  },
});

const dropDownStyles = StyleSheet.create({
  containerStyle: {
    height: hp("4.6%"),
    width: wp("35%"),
    zIndex: 20,
  },
  style: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
    borderBottomLeftRadius: wp("2%"),
    borderBottomRightRadius: wp("2%"),
    zIndex: 20,
  },
  itemStyle: {
    justifyContent: "flex-start",
    zIndex: 20,
  },
  dropDownStyle: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: wp("2%"),
    borderBottomRightRadius: wp("2%"),
    zIndex: 20,
  },
});

const FlexRowSpaceBetween = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${hp("2%")};
`