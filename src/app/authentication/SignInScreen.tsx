import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import "localization";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { firebase } from "../../firebase/config";
import useTheme from "hooks/useTheme";
import { Text } from "components/common/Text";
import { useUser } from "context/UserContext";
import { useModal } from "context/ModalContext";

const SignInScreen = ({ route, navigation }) => {
  const variant = route?.params?.variant;
  let userData = {
    userEmail: "",
  };
  const { t } = useTranslation();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const {setUser} = useUser();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUpData, setSignUpData] = useState(userData);
  const [errorText, setErrorText] = useState("");
  let inputEmail = useRef(null);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFnError, setIsFnError] = useState(false);
  const [textDisable, setDisableText] = useState(false)

  const {emailModal, setEmailModal} = useModal();
  //Auth

  const login = () => {
    // set loading to true
    setIsFnError(false);
    setIsVisible(false);
    setIsEmailError(false);
    if (signUpData.userEmail.split("@").length - 1 !== 1) {
      setErrorText(t("authentication:email_error"));
      setIsEmailError(true);
      setIsVisible(true);
      inputEmail.current.focus();
      return;
    } else if (email.length > 0 && password.length > 0) {
      setError("");
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          setLoading(false);
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection("users");
          console.log(`EMAIL VERIF TEST ${response.user.emailVerified}`)
          if(response.user.emailVerified == false){
            setEmailModal(true)
            return;
          }
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                alert("User does not exist anymore.");
                return;
              }
              
              const user = firestoreDocument.data();
              navigation.navigate("User", { user });
            })
            .catch((error) => {
              setLoading(false);
              alert(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    }
  };

  const ResendEmailVerification = () => {
    // We need to send a verification email to the user
    var user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(() => {
        // navigate to the Email Verification
        console.log("Verification email sended")
      })
    setDisableText(true)
    setTimeout(() => {
      setDisableText(false)
    }, 100000)
  }

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: theme.primary }}>
      <SafeAreaView style={{ backgroundColor: theme.primary }}>
        {variant === "emailConfirmation" ? (
          <Container>
            <BackgroundConfirmation
              source={require("assets/images/arzo-bg.png")}
            />
            <CircleConfirmation>
              <LogoConfirmation
                source={require("assets/images/logo_tranpsarent_bg.png")}
              />
            </CircleConfirmation>
            <Text size={'18px'} marginBot={'10px'} weight={'600'}>{t("authentication:congrats")}</Text>
            {/* <CongratsText>{t("authentication:congrats")}</CongratsText> */}
            <ConfirmEmailWrapper>
              <Text size={'18px'} marginBot={'10px'} weight={'600'} align={'center'} width={'250px'}>
                {t("authentication:confirm_email")}
              </Text>
            </ConfirmEmailWrapper>
            {textDisable ?
              <ResendEmail>
                <Text>Wait 1 minute to resend email</Text>
              </ResendEmail>
              :
              <ResendEmail onPress={() => ResendEmailVerification()}>
                <ResendEmailText>Resend confirmation email</ResendEmailText>
              </ResendEmail>}
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
                defaultValue={signUpData.userEmail}
              />
              <TextInput
                placeholder={t("pw")}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize={"none"}
                secureTextEntry={true}
              />
              <Button
                color={true}
                top={true}
                onPress={() => {
                  login();
                }}
                loading={loading}
              >

                {t("signin")}
              </Button>
              <Button
                color={false}
                top={false}
                onPress={() => navigation.navigate("SignUpPt1")}
                loading={false}
                marginTop={`${hp("2%")}px;`}
              >
                {t("signup")}
              </Button>
              <ForgetButton onPress={() => navigation.navigate("ForgetPassword")}>
                <FText>{t("fpw")}</FText>
              </ForgetButton>
            </Width>
          </Container>
        ) : (
          <Container>
            <Background source={require("assets/images/arzo-bg.png")} />
            <Circle>
              <Logo source={require("assets/images/logo_tranpsarent_bg.png")} />
            </Circle>
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
                defaultValue={signUpData.userEmail}
              />
              <TextInput
                placeholder={t("pw")}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize={"none"}
                secureTextEntry={true}
              />
              {error.length > 0 && <ValidationText>{error}</ValidationText>}
              <Button
                color={true}
                onPress={login}
                loading={loading}
                marginTop={`${hp("2%")}px;`}
                marginBot={`${hp("2%")}px;`}
              >
                {t("signin")}
              </Button>
              <Button
                color={false}
                onPress={() => navigation.navigate("SignUpPt1")}
                loading={false}
                marginBot={`${hp("2%")}px;`}
              >
                {t("signup")}
              </Button>
              {/* <ForgetButton onPress={() => navigation.navigate("ForgetPassword")}> */}
              <ForgetButton onPress={() => navigation.navigate("ForgetPassword")}>
                <FText weight="600">{t("fpw")}</FText>
              </ForgetButton>
            </Width>
          </Container>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const Container = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.primary};
`;

const Background = styled.Image`
  position: absolute;
  /* top: -220px; */  
  top: ${hp("-30%")}px;
  left: ${hp("-8%")}px;
  /* height: 520px; */
  height: ${hp("62%")}px;
  width: ${hp("62%")}px;
`;
const BackgroundConfirmation = styled.Image`
  position: absolute;
  top: -370px;
  left: -70px;
  height: 520px;
  width: 520px;
`;
const Circle = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: ${hp("22%")}px;
  width: ${hp("22%")}px;
  border-radius: ${hp("11%")}px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 7px;
  margin-top: ${hp("11%")}px;
  margin-bottom: ${hp("6.5%")}px;
`;
const CircleConfirmation = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 7px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Logo = styled.Image`
  width: ${hp("13%")}px;
  height: ${hp("13%")}px;
`;
const LogoConfirmation = styled.Image`
  width: 75px;
  height: 75px;
`;
const Width = styled.View`
  width: 80%;
`;
const FText = styled(Text)`
  margin-top: ${hp("3%")}px;
  text-align: center;
`;
const ForgetButton = styled.TouchableOpacity`
`
const ValidationText = styled.Text`
  color: red;
`;
const CongratsText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const ConfirmEmailWrapper = styled.View`
  background-color: white;
  width: 300px;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  border-width: 0.75px;
  border-color: ${(props) => props.theme.accent};
`;
const ConfirmEmailText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
const ResendEmail = styled.TouchableOpacity`
margin-bottom:20px
`
const ResendEmailText = styled.Text`
color:#1976b0
text-decoration: underline
font-size:16
`
