import React, { FC, ReactNode } from "react";
import { Vibration, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Text } from "./Text";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Flex,
  FlexCentered,
  RowCentered,
  Row,
  Column,
  ColumnStart,
  RowSpreadBetween,
} from "./View";
import { useNavigation } from "@react-navigation/native";
import useTheme from "hooks/useTheme";
import { ActivityIndicator } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

const Button: FC<{
  children: ReactNode;
  color: any;
  top?: any;
  onPress: any;
  loading?: any;
  marginTop?: any;
  marginBot?: any;
  disabled?: any;
  width?: any;
  variant?: any;
}> = ({
  children,
  color,
  top,
  onPress,
  loading,
  marginTop,
  marginBot,
  width,
  disabled,
  variant
}) => {
    return (
      <Container
        width={width}
        primary={color}
        marginTop={marginTop}
        marginBot={marginBot}
        disabled={disabled}
        onPress={onPress}
        variant={variant}
      >
        {loading ? (
          <ActivityIndicator color={"#ffffff"} />
        ) : (
          <ButtonText size="large" primary={color} disabled={disabled}>
            {children}
          </ButtonText>
        )}
      </Container>
    );
  };

export default Button;

const Container = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.primary ? props.theme.accent : props.theme.lightAccent};
  border-radius: ${wp("1.2%")}px;
  height: ${hp("6%")}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "100%")};
  margin-bottom: ${(props) => (props.marginBot ? props.marginBot : "0px")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};

  ${(props) =>
    props.variant === 'small' &&
    css`
            height: auto;
            width: auto;
            padding: ${hp("1%")}px ${wp("5%")}px; 
	`}
`;

const ButtonText = styled(Text)`
  color: ${(props) =>
    props.primary === true
      ? "white"
      : props.disabled === true
        ? "white"
        : "black"};
  width: 100%;
  text-align: center;
  font-weight: 600;
  ${css`
  font-size: ${hp('2%')}px;
`}
`;

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

export const UserAttributesButton: FC<{
  variant?: String;
  title: String;
  attribute: String;
  color?: String;
  link: string;
  params?: any;
}> = ({ variant, title, attribute, color, link, params }) => {
  const navigation = useNavigation();
  return (
    <TouchableButton


      onPress={
        link === '' ? null :
          params
            ? () => navigation.navigate(link, params)
            : () => navigation.navigate(link)
      }
      variant={variant}
    >
      <FlexCentered>
        <Text
          style={{ top: hp("0.3%") }}
          size="large"
          weight="500"
          color={color}
        >
          {title}
        </Text>
        <Text style={{ top: 0 }} size="xlarge" weight="bold" color={color}>
          {attribute}
        </Text>
      </FlexCentered>
    </TouchableButton>
  );
};

export const IconButton: FC<{
  variant?: string;
  title: string;
  subTitle?: string;
  icon?: string;
  color?: string;
  rounded?: boolean;
  func?: any;
  size?: string;
  loading?: any;
  shareCount?: number;
  onPress;
  bgColor
}> = ({ variant, title, subTitle, icon, color, rounded, func, onPress, size, loading, shareCount, bgColor }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useTranslation();
  var resendsLeft = 3 - shareCount;

  return (
    <IconButtonWrapper
      disabled={func ? false : true}
      onPress={func}
      variant={variant}
    >
      <StyledRow>
        <Row>
          <IconWrapper bgColor={bgColor} rounded={rounded}>
            <Icon name={icon} size={size ? 45 : 25} color={color ? color : theme.accent} />
          </IconWrapper>
          {subTitle ? (
            <ColumnStart style={{ marginLeft: 20 }}>
              <Text
                style={subTitle ? { top: hp("0.5%") } : null}
                size={"normal"}
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
          ) : (
            <ColumnCentered
              style={{ marginLeft: 20, alignItems: "flex-start" }}
            >
              <Text size={variant == "legal" ? "1.9" : "normal"} weight="bold">
                {title}
              </Text>
            </ColumnCentered>
          )}
        </Row>
        {
          variant === "share" &&
          <ColCenter>
            {resendsLeft === 0 ?
              <DisableTouchableButton disabled={true}>
                <Text weight={600} size={hp('1.6%')} color={theme.white}>Resend</Text>
              </DisableTouchableButton>
              :

              <SmallTouchableButton onPress={onPress} >
                {loading === true ? <ActivityIndicator color={'white'} style={{ padding: 2 }} /> :
                  <Text weight={600} size={hp('1.6%')} color={theme.white}>{t('user:resend')}</Text>}
              </SmallTouchableButton>}
            <Text size={hp('1.4%')}> *{resendsLeft} {t('user:resends_left')}</Text>
          </ColCenter>
        }
        {variant === "undefined" ? (
          <RowCentered>
            {/* if in contacts only*/}
            <TouchableIcon onPress={onPress}>
              <Icon name="person-add" size={25} color={theme.accent} />
            </TouchableIcon>
            {/* add loading */}
            <TouchableIcon>
              <Icon name="send" size={25} color={theme.accent} />
            </TouchableIcon>
          </RowCentered>
        ) : variant === "added" ? (
          <RowCentered>
            {/* add loading */}
            <TouchableIcon onPress={func}>
              <Icon name="person" size={25} color={theme.accent} />
            </TouchableIcon>
            <TouchableIcon>
              <Icon name="send" size={25} color={theme.accent} />
            </TouchableIcon>
          </RowCentered>
        ) : null}
      </StyledRow>
    </IconButtonWrapper>
  );
};

const IconButtonWrapper = styled(TouchableButton)`
  margin: ${hp("1.5%")}px 0px;
`;

const IconWrapper = styled(FlexCentered)`
  width: ${hp("6.5%")}px;
  height: ${hp("6.5%")}px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  border-radius: ${(props) => (props.rounded ? `${hp("6.5%")}px` : "7px")};
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

const SmallTouchableButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.accent};
  padding: ${hp('0.5%')}px ${wp('2.5%')}px;
  border-radius: ${hp('1%')}px;
`
const DisableTouchableButton = styled(TouchableOpacity)`
  background-color: skyblue;
  padding: ${hp('0.5%')}px ${wp('2.5%')}px;
  border-radius: ${hp('1%')}px;
`

const ColCenter = styled(Column)`
  justify-content: center;
  align-items: center;
  align-content: center;
  right: ${wp('4%')}px;
`