import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import "localization";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { firebase } from "../../firebase/config";
import useTheme from "hooks/useTheme";
import { Text } from "components/common/Text";

const ForgetPasswordScreen = ({ }) => {
    let userData = {
        userEmail: "",
    };
    const { t } = useTranslation();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [successText, setSuccessText] = useState('')
    const [email, setEmail] = useState('')
    const [errorText, setErrorText] = useState("");
    let inputEmail = useRef(null);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isFnError, setIsFnError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [signUpData, setSignUpData] = useState(userData);
    const [error, setError] = useState("");
    const sendEmail = () => {
        setIsFnError(false);
        setIsVisible(false);
        setIsEmailError(false);
        if (signUpData.userEmail.split("@").length - 1 !== 1) {
            setErrorText(t("authentication:email_error"));
            setIsEmailError(true);
            setIsVisible(true);
            // inputEmail.current.focus();
            return;
        } else if (email.length > 0) {
            setError("");
            setLoading(true)
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    setSuccessText('Reset link has been sent!')
                    setLoading(false)
                    setEmail('')
                }).catch((e) => {
                    console.log(e)
                })
        }
    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: theme.primary }}>
            <SafeAreaView style={{ backgroundColor: theme.primary }}>
                <Container>
                    <BackgroundConfirmation
                        source={require("assets/images/arzo-bg2.png")}
                    />
                    <ConfirmEmailWrapper>
                        <ConfirmEmailText>
                            {t('authentication:pass_forgotten')}
                        </ConfirmEmailText>
                    </ConfirmEmailWrapper>
                    <Width>
                        <TextInput
                            placeholder={t("email")}
                            onChangeText={(text) => {
                                setSignUpData({ ...signUpData, userEmail: text });
                                setEmail(text);
                            }}
                            errorText={errorText}
                            inputRef={inputEmail}
                            showErrorText={isEmailError}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            value={email}
                            defaultValue={signUpData.userEmail}
                        />
                        <ButtonContainer>
                            <Button
                                color={true}
                                top={true}
                                onPress={() => sendEmail()}
                                loading={loading}
                            >
                                {t('reset')}
                            </Button>
                        </ButtonContainer>
                        <FText>{successText}</FText>
                    </Width>
                </Container>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};
export default ForgetPasswordScreen;
const Container = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.primary};
`;
const BackgroundConfirmation = styled.Image`
  position: absolute;
  bottom: -700px;
right:-200px;
  height: 650px;
  width: 650px;
`;
const Width = styled.View`
  width: 80%;
  margin-top:15px;
`;
const FText = styled(Text)`
  margin-top: ${hp("3%")}px;
  text-align: center;
  font-weight:500;
  font-size:18px
`;
const ConfirmEmailWrapper = styled.View`
  background-color: white;
  width: 340px;
  padding-horizontal:25px;
  padding-vertical:25px;
  border-radius: 10px;
  margin-bottom: 25px;
  border-width: 0.75px;
  align-items:center;
  border-color: ${(props) => props.theme.accent};
`;
const ConfirmEmailText = styled.Text`
  font-size: 19px;
  font-weight: 500;
`;
const ButtonContainer = styled.View`
padding-top:25px;`