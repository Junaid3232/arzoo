import React, { FC, ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Text } from "../../components/common/Text";
import Icon from "react-native-vector-icons/Ionicons";
import {

  FlexCentered,
  RowCentered,
  Row,
  ColumnStart,
  RowSpreadBetween,
} from "../../components/common/View";
import { useNavigation } from "@react-navigation/native";
import useTheme from "hooks/useTheme";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ContactCard: FC<{
  variant?: string;
  title: string;
  subTitle?: string;
  icon?: string;
  color?: string;
  rounded?: boolean;
  onPressShare

  func?: any;
}> = ({ title, subTitle, color, rounded, func, variant, onPressShare }) => {
  const theme = useTheme();

  return (
    <IconButtonWrapper>
      <StyledRow>
        <Row>
          <IconWrapper rounded={rounded}>
            {/* <Avatar source={require('../../assets/images/avatarPlaceholder.png')} size={25} color={color ? color : theme.accent} /> */}
            <Icon name={"person-circle-outline"} size={45} color={color ? color : theme.accent} />
          </IconWrapper>
          <ColumnStart style={{ marginLeft: 20 }}>
            <Text
              style={subTitle ? { top: hp("0.5%") } : null}
              size="normal"
              weight="bold"
            >
              {title}
            </Text>
            <Text
              style={
                subTitle
                  ? { top: hp("3.5%"), position: "absolute", width: 200 }
                  : null
              }
            >
              {subTitle}
            </Text>
          </ColumnStart>
          <ColumnCentered
            style={{ marginLeft: 20, alignItems: "flex-start" }}
          >
          </ColumnCentered>
        </Row>
        {variant === "added" ? <RowCentered>
          <TouchableIcon onPress={func}>
            <Icon name="person" size={25} color={theme.accent} />
          </TouchableIcon>
          <TouchableIcon onPress={onPressShare}>
            <Icon name="send" size={25} color={theme.accent} />
          </TouchableIcon>
        </RowCentered> :
          <RowCentered>
            <TouchableIcon onPress={func}>
              <Icon name="person-add" size={25} color={theme.accent} />
            </TouchableIcon>
            <TouchableIcon onPress={onPressShare}>
              <Icon name="send" size={25} color={theme.accent} />
            </TouchableIcon>
          </RowCentered>
        }
      </StyledRow>
    </IconButtonWrapper>
  );
};

export default ContactCard;
export const TouchableButton = styled(TouchableOpacity)`
  ${(props) =>
    props.variant === "user-attribute" &&
    css`
      width: ${wp("24%")}px;
      border-radius: ${hp("1%")}px;
      padding: ${hp("1%")}px ${wp("0%")}px;
      background-color: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.white};
    `}
`;
const IconButtonWrapper = styled(View)`
  margin: ${hp("1.5%")}px 0px;
`;
const IconWrapper = styled(FlexCentered)`
  width: ${hp("6.5%")}px;
  height: ${hp("6.5%")}px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  border-radius: 30px
 
`;
const ColumnCentered = styled(ColumnStart)`
  justify-content: center;
`;
const StyledRow = styled(RowSpreadBetween)`
  width: 97%;
`;
const TouchableIcon = styled(TouchableOpacity)`
  padding: 0 ${wp("2.5%")}px;
`;
const Avatar = styled.Image`
width: 55px;
height: 55px;
border-radius: 27px;

`