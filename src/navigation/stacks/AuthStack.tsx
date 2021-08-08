
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "app/authentication/SignInScreen";
import SignUpPt1Screen from "app/authentication/SignUpPt1Screen";
import SignUpPt2Screen from "app/authentication/SignUpPt2Screen";
import ContactScreen from "app/user/ContactScreen";
import ForgetPasswordScreen from "app/authentication/ForgetPasswordScreen";
import PaymentScreen from "app/payment/PaymentScreen";

import "localization";
import { useTranslation } from "react-i18next";
import UserScreen from "app/user/UserScreen";
// import EmailVerificationScreen from "app/authentication/EmailVerificationScreen";

import { firebase } from "../../firebase/config";
import SharesScreen from "app/user/SharesScreen";
import SubscriptionScreen from "app/user/SubscriptionScreen";
import LegalScreen from "app/user/LegalScreen";
import SettingsScreen from "app/user/SettingsScreen";
import useTheme from "hooks/useTheme";
import FloorListShareScreen from "app/floor/FloorListShareScreen";

const AuthStack = createStackNavigator();

const AuthStackScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);

  const headerStyle = {
    headerStyle: {
      backgroundColor: theme.primaryDark,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerBackTitleVisible: false,
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(firebase.auth().currentUser);
    });
  }, []);

  return (
    <AuthStack.Navigator
      screenOptions={{
        ...headerStyle,
      }}
    >
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={"SignUpPt1"}
        component={SignUpPt1Screen}
        options={{
          headerShown: true,
          headerTitle: t('routes:signUp')
        }}
      />
      <AuthStack.Screen
        name={"SignUpPt2"}
        component={SignUpPt2Screen}
        options={{
          headerShown: true,
          headerTitle: t('routes:signUp')
        }}
      />
      <AuthStack.Screen
        name={"Payment"}
        component={PaymentScreen}
        options={{
          headerShown: true,
          headerTitle: t('routes:payment')
        }}
      />
      <AuthStack.Screen
        name={"ForgetPassword"}
        component={ForgetPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: t('routes:pass_reset')
        }}
      />
      <AuthStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          headerShown: false,
          headerTitle: t('routes:subscription')
        }}
      />
      <AuthStack.Screen
        name="Legal"
        component={LegalScreen}
        options={{
          headerShown: true,
          headerTitle: t('routes:legal')
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
