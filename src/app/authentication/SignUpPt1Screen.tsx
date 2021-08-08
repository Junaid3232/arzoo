import React, { useState, useRef, useEffect, useContext } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import "localization";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "react-native-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import useTheme from "hooks/useTheme";
import userPlaceholderImage from "../../assets/images/account/account.jpeg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpPt1Screen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  let userData = {
    firstName: "",
    lastName: "",
    email: "",
    accountType: "",
    businessName: "",
    phone: "",
    country: "",
    province: "",
    address: "",
    city: "",
    apt: "",
    postalCode: "",
  };
  //States
  const [signUpData, setSignUpData] = useState(userData);
  const [errorText, setErrorText] = useState("");
  const [showErrorText, setShowErrorText] = useState({
    fn: false,
    ln: false,
    email: false,
  });

  const [response, setResponse] = useState(null);

  const [firstNameFilled, setFirstNameFilled] = useState("");
  const [lastNameFilled, setLastNameFilled] = useState("");
  const [emailFilled, setEmailFilled] = useState("");
  const [fieldsFilled, setFieldsFilled] = useState(false);

  //References
  let inputFirstName = useRef(null);
  let inputLastName = useRef(null);
  let inputEmail = useRef(null);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFnError, setIsFnError] = useState(false);
  useEffect(() => {
    if (firstNameFilled && lastNameFilled && emailFilled) {
      setFieldsFilled(true);
    } else {
      setFieldsFilled(false);
    }
  }, [firstNameFilled, lastNameFilled, emailFilled]);

  // const checkInputs = () => {
  //   // WS:: Adding validation
  //   if (
  //     signUpData.firstName.length > 0 &&
  //     signUpData.lastName.length > 0 &&
  //     signUpData.email.length > 0
  //   ) {
  //     setErrorText("");
  //     navigation.navigate("SignUpPt2", {
  //       userData: signUpData,
  //       userImage: response?.uri,
  //     });
  //   } else {
  //     setErrorText("Fill out the required fields");
  //   }
  // if (signUpData.firstName.length <= 1) {
  //     setErrorText(t('authentication:first_name_error'))
  //     setShowErrorText({fn: true, ln: false, email: false})
  //     console.log(errorText)
  //     console.log(`this is the set : ${showErrorText.fn}`)
  //     inputFirstName.current.focus();
  //     return
  // } else if(signUpData.lastName.length === 0){
  //     setErrorText(t('authentication:last_name_error'));
  //     setShowErrorText({fn: false, ln: true, email: false})
  //     console.log(errorText)
  //     inputLastName.current.focus();
  //     return
  // } else if(signUpData.email.split("@").length - 1 !== 1){
  //     setErrorText(t('authentication:email_error'))
  //     setShowErrorText({fn: false, ln: false, email: true})
  //     inputEmail.current.focus();
  //     return
  // } else {
  //     navigation.navigate('SignUpPt2', { userData: signUpData, userImage: userImage })
  //     setShowErrorText({fn: false, ln: false, email: false})
  // }
  // };
  const handlePress = () => {
    setIsFnError(false);
    setIsVisible(false);
    setIsEmailError(false);
    if (signUpData.firstName.length <= 1) {
      setErrorText(t("authentication:first_name_error"));
      setIsFnError(true);
      setIsVisible(true);
      inputFirstName.current.focus();
      return;
    } else if (signUpData.lastName.length === 0) {
      setErrorText(t("authentication:last_name_error"));
      setIsLnError(true);
      setIsVisible(true);
      inputLastName.current.focus();
      return;
    } else if (signUpData.email.split("@").length - 1 !== 1) {
      setErrorText(t("authentication:email_error"));
      setIsEmailError(true);
      setIsVisible(true);
      inputEmail.current.focus();
      return;
    } else {
      navigation.navigate("SignUpPt2", {
        userData: signUpData,
        userImage: response?.uri,
      });
    }
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setResponse(response);
      }
    );
  };


  return (
    <KeyboardAwareScrollView style={{ backgroundColor: theme.primary }}>

      <SafeAreaView style={{ backgroundColor: theme.primary }}>
        <Container>
          <Background source={require("assets/images/arzo-bg.png")} />
          <TouchableOpacity onPress={selectImage}>
            {
              !response || response?.didCancel == true ?
                <CircleBlock>
                  <Icon size={70} name="image" color={theme.lightAccent} />
                </CircleBlock>
                :
                <Circle
                  source={{ uri: response.uri }}
                />

            }
          </TouchableOpacity>
          <Width>
            <TextInput
              placeholder={t("first_name")}
              onChangeText={(text) => {
                setSignUpData({ ...signUpData, firstName: text });
                setFirstNameFilled(text);
              }}
              errorText={errorText}
              inputRef={inputFirstName}
              showErrorText={isFnError}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              defaultValue={signUpData.firstName}
              placement={"bottom" | "center"}
            />
            <TextInput
              placeholder={t("last_name")}
              onChangeText={(text) => {
                setSignUpData({ ...signUpData, lastName: text });
                setLastNameFilled(text);
              }}
              inputRef={inputLastName}
              errorText={errorText}
              showErrorText={showErrorText.ln}
            />
            <TextInput
              placeholder={t("email")}
              onChangeText={(text) => {
                setSignUpData({ ...signUpData, email: text });
                setEmailFilled(text);
              }}
              errorText={errorText}
              inputRef={inputEmail}
              showErrorText={isEmailError}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              defaultValue={signUpData.email}
            />

            {/* {errorText.length > 0 && (
            <Text style={{ color: "red" }}>{errorText}</Text>
          )} */}
            <Button
              color={fieldsFilled === true ? true : false}
              top={true}
              onPress={handlePress}
              disabled={fieldsFilled === true ? false : true}
            >
              {t("next")}
            </Button>
          </Width>
        </Container>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignUpPt1Screen;

const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.primary};
`;

const Background = styled.Image`
  position: absolute;
  top: -400px;
  left: -70px;
  height: 520px;
  width: 520px;
`;

const Circle = styled.Image`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 7px;
  margin-top: 50px;
  margin-bottom: 60px;
`;

const CircleBlock = styled.View`
    display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 7px;
  margin-top: 50px;
  margin-bottom: 60px;
`
const Logo = styled.Image`
  width: 130px;
  height: 130px;
`;
const Width = styled.View`
  width: 70%;
`;
const FText = styled.Text`
  font-size: 15px;
  margin-top: 15px;
  font-weight: 600;
  text-align: center;
`;
