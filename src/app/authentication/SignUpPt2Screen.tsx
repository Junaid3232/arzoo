import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components/native";
import "localization";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";



import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import { Alert, StyleSheet, View } from "react-native";
var passwordValidator = require("password-validator");
import { firebase } from "../../firebase/config";
import * as ImagePicker from "react-native-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import useTheme from "hooks/useTheme";
import userPlaceholderImage from "assets/images/account/account.jpeg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CheckBox from '@react-native-community/checkbox';
import { Text } from "components/common/Text";



const SignUpPt2Screen = ({ route, navigation, props }) => {
  //Retrieve Data input from previous page
  const { userData, userImage } = route.params;
  const theme = useTheme();

  const { t } = useTranslation();

  //States
  const [signUpData, setSignUpData] = useState(userData);
  const [profileImage, setProfileImage] = useState(userImage);
  const [accountType, setAccountType] = useState({ value: null, details: "" });
  const [country, setCountry] = useState(null);
  const [province, setProvince] = useState(null);
  const [pwVisibility, setPwVisibility] = useState(false);
  const [pwds, setPwds] = useState({ pw: "", cPw: "" });
  const [isVisible, setIsVisible] = useState(false);
  // states for disable create account button if fields are empty
  const [typeFilled, setTypeFilled] = useState("");
  const [passwordFilled, setPasswordFilled] = useState("");
  const [cPasswordFilled, setCPasswordFilled] = useState("");
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  useEffect(() => {
    if (typeFilled && passwordFilled && cPasswordFilled && toggleCheckBox && country && province && signUpData.phone && signUpData.city && signUpData.address && signUpData.postalCode){
      setFieldsFilled(true);
    } else {
      setFieldsFilled(false);
    }
  }, [typeFilled, passwordFilled, cPasswordFilled, toggleCheckBox, country, province, signUpData]);

  const [errorText, setErrorText] = useState("");

  const [pwConditions, setPwConditions] = useState({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
  });
  const [loading, setLoading] = useState(false);

  //Input References & States
  const scrollRef = React.useRef(null);

  let inputFirstName = useRef(null);
  const [isFnError, setIsFnError] = useState(false);
  let inputLastName = useRef(null);
  const [isLnError, setIsLnError] = useState(false);
  let inputEmail = useRef(null);
  const [isEmailError, setIsEmailError] = useState(false);
  let inputAccountType = useRef(null);
  const [isAtError, setIsAtError] = useState(false);
  let inputBusinessName = useRef(null);
  const [isBnError, setIsBnError] = useState(false);
  let inputPhone = useRef(null);
  const [isPhoneError, setIsPhoneError] = useState(false);
  let inputCountry = useRef(null);
  const [isCountryError, setIsCountryError] = useState(false);
  let inputProvince = useRef(null);
  const [isProvinceError, setIsProvinceError] = useState(false);
  let inputAddress = useRef(null);
  const [isAddressError, setIsAddressError] = useState(false);
  let inputCity = useRef(null);
  const [isCityError, setIsCityError] = useState(false);
  let inputApt = useRef(null);
  const [isAptError, setIsAptError] = useState(false);
  let inputPostalCode = useRef(null);
  const [isPcError, setIsPcError] = useState(false);
  let inputPw = useRef(null);
  const [isPwError, setIsPwError] = useState(false);
  let inputCPw = useRef(null);
  const [isCPwError, setIsCPwError] = useState(false);

  //Component Data
  const accountTypes = [
    {
      label: t("accountTypes:free"),
      value: "free",
      icon: () => (
        <Icon
          name="people"
          size={20}
          style={{ marginRight: 5 }}
          color={theme.accent}
        />
      ),
      details: null,
    },
    {
      label: t("accountTypes:pro"),
      value: "pro",
      icon: () => (
        <Icon
          name="hammer"
          size={20}
          style={{ marginRight: 5 }}
          color={theme.accent}
        />
      ),
      details: t("accountTypes:entr_cost"),
    },
  ];

  const countries = [
    { label: t("countries:ca"), value: "ca" },
    { label: t("countries:usa"), value: "usa" },
  ];

  const provinces = [
    { label: t("countries:ab"), value: "ab" },
    { label: t("countries:bc"), value: "bc" },
    { label: t("countries:mb"), value: "mb" },
    { label: t("countries:nb"), value: "nb" },
    { label: t("countries:nl"), value: "nl" },
    { label: t("countries:ns"), value: "ns" },
    { label: t("countries:nt"), value: "nt" },
    { label: t("countries:nu"), value: "nu" },
    { label: t("countries:on"), value: "on" },
    { label: t("countries:pe"), value: "pe" },
    { label: t("countries:qc"), value: "qc" },
    { label: t("countries:sk"), value: "sk" },
    { label: t("countries:yt"), value: "yt" },
  ];

  const states = [
    { label: t("countries:al"), value: "al" },
    { label: t("countries:ak"), value: "ak" },
    { label: t("countries:az"), value: "az" },
    { label: t("countries:ar"), value: "ar" },
    { label: t("countries:cal"), value: "cal" },
    { label: t("countries:co"), value: "co" },
    { label: t("countries:ct"), value: "ct" },
    { label: t("countries:de"), value: "de" },
    { label: t("countries:dc"), value: "dc" },
    { label: t("countries:fl"), value: "fl" },
    { label: t("countries:ga"), value: "ga" },
    { label: t("countries:hi"), value: "hi" },
    { label: t("countries:id"), value: "id" },
    { label: t("countries:il"), value: "il" },
    { label: t("countries:in"), value: "in" },
    { label: t("countries:ia"), value: "ia" },
    { label: t("countries:ks"), value: "ks" },
    { label: t("countries:ky"), value: "ky" },
    { label: t("countries:ab"), value: "ab" },
    { label: t("countries:la"), value: "la" },
    { label: t("countries:me"), value: "me" },
    { label: t("countries:md"), value: "md" },
    { label: t("countries:ma"), value: "ma" },
    { label: t("countries:mi"), value: "mi" },
    { label: t("countries:mn"), value: "mn" },
    { label: t("countries:ms"), value: "ms" },
    { label: t("countries:mo"), value: "mo" },
    { label: t("countries:mt"), value: "mt" },
    { label: t("countries:ne"), value: "ne" },
    { label: t("countries:nv"), value: "nv" },
    { label: t("countries:nh"), value: "nh" },
    { label: t("countries:nj"), value: "nj" },
    { label: t("countries:nm"), value: "nm" },
    { label: t("countries:ny"), value: "ny" },
    { label: t("countries:nc"), value: "nc" },
    { label: t("countries:nd"), value: "nd" },
    { label: t("countries:oh"), value: "oh" },
    { label: t("countries:ok"), value: "ok" },
    { label: t("countries:or"), value: "or" },
    { label: t("countries:pa"), value: "pa" },
    { label: t("countries:ri"), value: "ri" },
    { label: t("countries:sc"), value: "sc" },
    { label: t("countries:sd"), value: "sd" },
    { label: t("countries:tn"), value: "tn" },
    { label: t("countries:tx"), value: "tx" },
    { label: t("countries:ut"), value: "ut" },
    { label: t("countries:vt"), value: "vt" },
    { label: t("countries:va"), value: "va" },
    { label: t("countries:wa"), value: "wa" },
    { label: t("countries:wv"), value: "wv" },
    { label: t("countries:wi"), value: "wi" },
    { label: t("countries:wy"), value: "wy" },
    { label: t("countries:as"), value: "as" },
    { label: t("countries:gu"), value: "gu" },
    { label: t("countries:mp"), value: "mp" },
    { label: t("countries:pr"), value: "pr" },
    { label: t("countries:vi"), value: "vi" },
    { label: t("countries:um"), value: "um" },
    { label: t("countries:fm"), value: "fm" },
    { label: t("countries:mh"), value: "mh" },
    { label: t("countries:pw"), value: "pw" },
  ];

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setProfileImage(response.uri);
      }
    );
  };

  const writeNewUser = (user) => {
    // signUpData.accountType === 'cons' ? (
    //     firebase.database().ref(`users/${user.uid}`).set({
    //         firstName: signUpData.fistName,
    //         lastName: signUpData.lastName,
    //         email: signUpData.email,
    //         accountType: signUpData.accountType,
    //         creationTime: user.metadata.creationTime,
    //     })) : (
    //     firebase.database().ref(`users/${user.uid}`).set({
    //         firstName: signUpData.firstName,
    //         lastName: signUpData.lastName,
    //         email: signUpData.email,
    //         accountType: accountType.value,
    //         businessName: signUpData.businessName,
    //         phone: signUpData.phone,
    //         country: signUpData.country,
    //         province: signUpData.province,
    //         city: signUpData.city,
    //         address: signUpData.address,
    //         apt: signUpData.apt,
    //         postalCode: signUpData.postalCode,
    //         creationTime: user.metadata.creationTime,
    //     }))
  };

  const checkPasswords = () => {
    // setLoading(true)
    setIsPwError(false);
    if (pwds.pw !== pwds.cPw) {
      setErrorText(t("authentication:password_match"));
      setIsPwError(true);
      setIsVisible(true);
      inputPw.current.focus();
      return;
    } else {
      var schema = new passwordValidator();
      schema
        .is()
        .min(8)
        .is()
        .max(30)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits()
        .has()
        .not()
        .spaces()
        .is()
        .not()
        .oneOf(["Password1", "Password12", "Password123"]);
      const passwordValid = schema.validate(pwds.pw, { list: true });
      console.log(passwordValid);
      switch (passwordValid[0]) {
        case "min":
          setErrorText(t("authentication:password_short"));
          setIsPwError(true);
          setIsVisible(true);
          setPwConditions({ c1: true, c2: false, c3: false, c4: false });
          inputPw.current.focus();
          break;
        case "max":
          setErrorText(t("authentication:password_long"));
          setIsPwError(true);
          setIsVisible(true);
          setPwConditions({ c1: true, c2: false, c3: false, c4: false });
          inputPw.current.focus();
          break;
        case "lowercase":
          setErrorText(t("authentication:password_lc"));
          setIsPwError(true);
          setIsVisible(true);
          setPwConditions({ c1: false, c2: true, c3: false, c4: false });
          inputPw.current.focus();
          break;
        case "uppercase":
          setErrorText(t("authentication:password_uc"));
          setIsPwError(true);
          setIsVisible(true);
          setPwConditions({ c1: false, c2: false, c3: true, c4: false });
          inputPw.current.focus();
          break;
        case "digits":
          setErrorText(t("authentication:password_num"));
          setIsPwError(true);
          setIsVisible(true);
          setPwConditions({ c1: false, c2: false, c3: false, c4: true });
          inputPw.current.focus();
          break;
        case "oneOf":
          setErrorText(t("authentication:password_safe"));
          setIsPwError(true);
          setIsVisible(true);
          setPwConditions({ c1: false, c2: false, c3: false, c4: false });
          inputPw.current.focus();
          break;
        default:
          console.log("password is valid");
          return true;
      }
    }
    return true;
  };

  const checkInputs = () => {
    console.log(signUpData);
    //Reset States
    setIsFnError(false);
    setIsLnError(false);
    setIsEmailError(false);
    setIsAtError(false);
    setIsBnError(false);
    setIsPhoneError(false);
    setIsCountryError(false);
    setIsProvinceError(false);
    setIsAddressError(false);
    setIsCityError(false);
    setIsAptError(false);
    setIsPcError(false);
    setIsPwError(false);
    setIsCPwError(false);

    //Reset error visibility
    setIsVisible(false);

    setSignUpData({ ...signUpData, accountType: accountType.value });

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
    } else if (
      signUpData.accountType === "pro"
    ) {
    } else {
      if (checkPasswords()) {
        //    start loading spinner
        setLoading(true);
        let username =
          signUpData.firstName.toLowerCase() +
          signUpData.lastName.toLowerCase();
        firebase
          .firestore()
          .collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((element) => {
              if (username === element?.data()?.username) {
                username =
                  signUpData.firstName.toLowerCase() +
                  signUpData.lastName.toLowerCase() +
                  Math.floor(1000 + Math.random() * 9000);
                return;
              }
            });
            firebase
              .auth()
              .createUserWithEmailAndPassword(signUpData.email, pwds.pw)
              .then((response) => {
                // end loading spinner
                setLoading(false);
                const uid = response.user.uid;
                const data = {
                  id: uid,
                  address: {
                    billing: {
                      apt: signUpData.apt,
                      city: signUpData.city,
                      address: signUpData.address,
                      country: signUpData.country,
                      postalCode: signUpData.postalCode,
                      province: signUpData.province,
                    },
                  },
                  username: username,
                  // birth: signUpData.birth,
                  // businessUID: signUpData.business,
                  contact: {
                    email: signUpData.email,
                    phone: signUpData.phone,
                  },
                  name: {
                    first: signUpData.firstName,
                    last: signUpData.lastName,
                  },
                  profile: {
                    accountType: accountType.value,
                  },
                };
                // after succeful account creation in auth
                // now adding that same user in the firestore collection for rich information
                const usersRef = firebase.firestore().collection("users");
                usersRef
                  .doc(uid)
                  .set(data)
                  .then(() => {
                    // We need to send a verification email to the user
                    var user = firebase.auth().currentUser;
                    user
                      .sendEmailVerification()
                      .then(() => {
                        // navigate to the Email Verification
                        if (accountType.value === 'pro') {
                          //navigate to payment if account type pro is selected
                          navigation.navigate('Payment', { user: data })
                        }
                        else {

                          navigation.navigate("SignIn", {
                            user: data,
                            variant: "emailConfirmation",
                          })
                        }
                      })
                      .catch((error) => {
                        console.log("Email Verification Error:" + error);
                        if(error == ':The email address is already in use by another account.'){
                          console.log('test')
                        }
                      });
                  })
                  .catch((error) => {
                    setLoading(false);
                    //Alert.alert(error.message);
                    console.log("Error::" + error.message);
                  });
                const userCollectionsRef = firebase.firestore().collection("users-collections")
                userCollectionsRef.doc(uid)
                  .set({
                    Mnrp3d1J5ABHf7qEM2Ky: {
                      active: true
                    },
                    PhdEUiBdLLYJhP2B5dy7: {
                      active: true
                    },
                  }, { merge: true })
              })
              .catch((error) => {
                setLoading(false);
                //Alert.alert(error.message);
                console.log("Error::" + error.message);
              });
            console.log("Username Chosen :: " + username);
          });
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme.primary }}
      ref={scrollRef}
    >
      <Background source={require("assets/images/arzo-bg.png")} />
      <TouchableOpacity onPress={selectImage}>
        {
          profileImage ?
            <Circle
              source={profileImage ? { uri: profileImage } : userPlaceholderImage}
            /> :
            <CircleBlock>
              <Icon size={40} name="image" color={theme.lightAccent} />
            </CircleBlock>
        }

      </TouchableOpacity>
      <Width>
        <TextInput
          placeholder={t("first_name")}
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, firstName: text })
          }
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
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, lastName: text })
          }
          errorText={errorText}
          inputRef={inputLastName}
          showErrorText={isLnError}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          defaultValue={signUpData.lastName}
        />
        <TextInput
          placeholder={t("email")}
          onChangeText={(text) => setSignUpData({ ...signUpData, email: text })}
          errorText={errorText}
          inputRef={inputEmail}
          showErrorText={isEmailError}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          defaultValue={signUpData.email}
        />
        <Row>
          <DropDownPicker
            items={accountTypes}
            defaultValue={accountType.value}
            containerStyle={dropDownStyles.containerStyle}
            style={dropDownStyles.style}
            itemStyle={dropDownStyles.itemStyle}
            dropDownStyle={dropDownStyles.dropDownStyle}
            onChangeItem={(item) => {
              setAccountType({ value: item.value, details: item.details });
              setTypeFilled(item.value);
            }}
            labelStyle={{ fontSize: hp("2.2%"), color: theme.black }}
            placeholder={t("accountTypes:account_types")}
          />
          <TouchableOpacity onPress={()=> navigation.navigate('Subscription')}>
          <QuestionIcon>
            <IconFontAwesome
              name="question-circle"
              size={hp("3.2%")}
              color={theme.accent}
            />
          </QuestionIcon>
          </TouchableOpacity>
        </Row>
        <ContactBlock>
          <Title>{t("authentication:contact_info")}</Title>
          <TextInput
            placeholder={t("phone")}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, phone: text })
            }
            errorText={errorText}
            showErrorText={isPhoneError}
            keyboardType={"phone-pad"}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            inputRef={inputPhone}
          />
          <DropDownPicker
            items={countries}
            defaultValue={country}
            containerStyle={dropDownStyles.countryContainerStyle}
            style={dropDownStyles.style}
            itemStyle={dropDownStyles.itemStyle}
            dropDownStyle={dropDownStyles.dropDownStyle}
            onChangeItem={(item) => setCountry(item.value)}
            labelStyle={{ fontSize: hp("2.2%"), color: theme.black }}
            placeholder={t("country")}
          />
          <Behind>
            <DropDownPicker
              items={country === "ca" ? provinces : states}
              defaultValue={province}
              containerStyle={dropDownStyles.countryContainerStyle}
              style={dropDownStyles.style}
              itemStyle={dropDownStyles.itemStyle}
              dropDownStyle={dropDownStyles.dropDownStyle}
              onChangeItem={(item) => setProvince(item.value)}
              labelStyle={{ fontSize: hp("2.2%"), color: theme.black }}
              placeholder={
                country === "ca" || country === null
                  ? t("province")
                  : t("state")
              }
            />
          </Behind>
          <TextInput
            placeholder={t("city")}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, city: text })
            }
            errorText={errorText}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            inputRef={inputCity}
          />
          <TextInput
            placeholder={t("address")}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, address: text })
            }
            errorText={errorText}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            inputRef={inputAddress}
          />
          <TextRow>
            <TextInput
              placeholder={t("apt")}
              width={"40%"}
              onChangeText={(text) =>
                setSignUpData({ ...signUpData, apt: text })
              }
              errorText={errorText}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              inputRef={inputApt}
            />
            <TextInput
              placeholder={
                country === "ca" || country === null
                  ? t("postal_code")
                  : t("zip_code")
              }
              width={"55%"}
              onChangeText={(text) =>
                setSignUpData({ ...signUpData, postalCode: text })
              }
              errorText={errorText}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              inputRef={inputPostalCode}
            />
          </TextRow>
        </ContactBlock>

        <InputBackground source={require("assets/images/arzo-bg.png")} />
        <PasswordBlock>
          <Title>{t("pw")}</Title>
          <TitleDetailsBlock>
            <TitleDetails>
              {t("authentication:password_details_1")}
            </TitleDetails>
            <TitleDetails style={pwConditions.c1 ? { color: "red" } : {}}>
              {t("authentication:condition_1")}
            </TitleDetails>
            <TitleDetails>
              {t("authentication:password_details_2")}
            </TitleDetails>
            <TitleDetails style={pwConditions.c2 ? { color: "red" } : {}}>
              {t("authentication:condition_2")}
            </TitleDetails>
            <TitleDetails>
              {t("authentication:password_details_3")}
            </TitleDetails>
            <TitleDetails style={pwConditions.c3 ? { color: "red" } : {}}>
              {t("authentication:condition_3")}
            </TitleDetails>
            <TitleDetails>
              {t("authentication:password_details_4")}
            </TitleDetails>
            <TitleDetails style={pwConditions.c4 ? { color: "red" } : {}}>
              {t("authentication:condition_4")}
            </TitleDetails>
            <TitleDetails>
              {t("authentication:password_details_5")}
            </TitleDetails>
          </TitleDetailsBlock>
          <Row>
            <TextInput
              placeholder={t("pw")}
              secureTextEntry={!pwVisibility}
              maxLength={30}
              autoCapitalize={"none"}
              onChangeText={(text) => {
                setPwds({ ...pwds, pw: text });
                setPasswordFilled(text);
              }}
              errorText={errorText}
              inputRef={inputPw}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              showErrorText={isPwError}
            />
            <Icon
              onPress={() => setPwVisibility(!pwVisibility)}
              name={pwVisibility ? "eye" : "eye-off"}
              size={hp("3.2%")}
              style={{ marginTop: hp("-1.7%"), marginLeft: wp("3%") }}
              color={theme.accent}
            />
          </Row>
          <Row>
            <TextInput
              placeholder={t("cpw")}
              secureTextEntry={!pwVisibility}
              maxLength={30}
              autoCapitalize={"none"}
              onChangeText={(text) => {
                setPwds({ ...pwds, cPw: text });
                setCPasswordFilled(text);
              }}
              errorText={errorText}
              inputRef={inputCPw}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              showErrorText={isCPwError}
            />
          </Row>
        </PasswordBlock>

        <Container1>
          <Container2>
            <CheckBox
              disabled={false}
              style={{
                width: 20,
                height: 20,
              }}
              boxType={'square'}
              value={toggleCheckBox}
              lineWidth={2}
              onCheckColor={"#018ABE"}
              onTintColor={"#018ABE"}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              animationDuration={0}
              onAnimationType="stroke"
            />
          </Container2>
          <TextTermsContainer>
            <Text color={'gray'}>{t('authentication:accept')}
              <Text onPress={() => navigation.navigate("Legal")} color={'gray'} underline={true}> {t('authentication:terms_use')}</Text>
              <Text color={'gray'}> & {t('authentication:la')}</Text>
              <Text color={'gray'} onPress={() => navigation.navigate("Legal")} underline={true}>{t('authentication:privacy_policy')}</Text></Text>
          </TextTermsContainer>


        </Container1>

        <Button
          color={fieldsFilled === true ? true : false}
          top={true}
          onPress={checkInputs}
          loading={loading}
          disabled={fieldsFilled === true ? false : true}

        >
          {accountType.value === 'pro' ? t('authentication:create_acc_payment') : t('authentication:cAccount')}
        </Button>
      </Width>
    </KeyboardAwareScrollView>
  );
};

export default SignUpPt2Screen;

const Background = styled.Image`
  position: absolute;
  top: -400px;
  left: -70px;
  height: 520px;
  width: 520px;
  background-color: ${(props) => props.theme.primary};
`;
const Circle = styled.Image`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 7px;
  margin-top: 50px;
  margin-bottom: 40px;
  margin: 40px auto;
`;

const CircleBlock = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 7px;
  margin-top: 50px;
  margin-bottom: 40px;
  margin: 40px auto;
`
const Width = styled.View`
  width: 70%;
  margin: 0 auto;
  padding-bottom: ${hp("10%")}px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 1;
`;
const TextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
`;
const QuestionIcon = styled.View`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: ${hp("2.6%")};
  font-weight: bold;
  margin-top: ${hp("1.3%")};
  margin-bottom: ${hp("2%")};
`;
const dropDownStyles = StyleSheet.create({
  containerStyle: {
    height: hp("6.6%"),
    width: wp("53%"),
  },
  style: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
    borderBottomLeftRadius: wp("2%"),
    borderBottomRightRadius: wp("2%"),
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
  dropDownStyle: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: wp("2%"),
    borderBottomRightRadius: wp("2%"),
  },
  countryContainerStyle: {
    height: hp("6.6%"),
    marginBottom: hp("2%"),
    zIndex: 20,
  },
});
const InputBackground = styled.Image`
  position: absolute;
  top: 250px;
  right: 200px;
  height: 1000px;
  width: 1000px;
  z-index: -5;
`;

const ContactBlock = styled.View`
  margin-top: ${hp("3%")};
`
const PasswordBlock = styled.View`
  margin-top: ${hp("3%")};
`;

const TitleDetailsBlock = styled.Text`
  margin-top: ${hp("-1.5%")};
  margin-bottom: ${hp("3%")};
`;
const TitleDetails = styled.Text`
  font-weight: 500;
  color: ${(props) => props.theme.primaryDark};
  font-size: ${hp("1.8%")};
`;
const Behind = styled.View`
  z-index: 2;
`;

const Container1 = styled.View`
  flex-direction:row;
  flex:1;
  padding:20px 0px;
  align-items: center;
`
const Container2 = styled.View`
flex: 0.11;
`
const TextTermsContainer = styled.View`
 flex: 0.9;
 align-items: flex-start;
 width: ${wp('90%')}px;
`