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

const UserStack = createStackNavigator();

const UserStackScreen = ({ navigation, route }) => {
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
    <UserStack.Navigator
      screenOptions={{
        ...headerStyle,
      }}
    >
      {currentUser ? (
        <>
          {currentUser.emailVerified ? (
            <>
              <UserStack.Screen
                name="User"
                component={UserScreen}
                options={{
                  headerShown: false,
                  headerTitle: t('routes:user')
                }}
              />
              <UserStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                  headerShown: true,
                  headerTitle: t('routes:contact')
                }}
              />
              <UserStack.Screen
                name="FloorsListShare"
                component={FloorListShareScreen}
                options={{
                  headerShown: true,
                  headerTitle: t('routes:slct_list')
                }}
              />

              <UserStack.Screen
                name="Shares"
                component={SharesScreen}
                options={{
                  headerShown: true,
                  headerTitle: t('routes:shares')
                }}
              />
              <UserStack.Screen
                name="Subscription"
                component={SubscriptionScreen}
                options={{ headerShown: false,
                  headerTitle: t('routes:subscription')
                 }}
              />
              <UserStack.Screen
                name="Legal"
                component={LegalScreen}
                options={{ headerShown: true,
                  headerTitle: t('routes:legal') }}
              />
              <UserStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerShown: true,
                  headerTitle: t('routes:settings') }}
              />

            </>
          ) : (
            <>
              <UserStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false,
                  headerTitle: t('routes:signIn') }}
              />
              <UserStack.Screen
                name={"SignUpPt1"}
                component={SignUpPt1Screen}
                options={{ headerShown: true,
                  headerTitle: t('routes:signUp') }}
              />
              <UserStack.Screen
                name={"SignUpPt2"}
                component={SignUpPt2Screen}
                options={{ headerShown: true,
                  headerTitle: t('routes:signUp') }}
              />
              <UserStack.Screen
                name="FloorsListShare"
                component={FloorListShareScreen}
                options={{
                  headerShown: false,
                  headerTitle: t('routes:slct_list')
                }}
              />
              <UserStack.Screen
                name="User"
                component={UserScreen}
                options={{ headerShown: false,
                  headerTitle: t('routes:user') }}
              />
              <UserStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{ headerShown: true,
                  headerTitle: t('routes:contact') }}
              />
              <UserStack.Screen
                name="Shares"
                component={SharesScreen}
                options={{ headerShown: true,
                  headerTitle: t('routes:shares') }}
              />
              <UserStack.Screen
                name="Subscription"
                component={SubscriptionScreen}
                options={{ headerShown: false,
                  headerTitle: t('routes:subscription') }}
              />
              <UserStack.Screen
                name="Legal"
                component={LegalScreen}
                options={{ headerShown: true,
                  headerTitle: t('routes:legal')}}
              />
              <UserStack.Screen
                name={"ForgetPassword"}
                component={ForgetPasswordScreen}
                options={{ headerShown: true, headerTitle: t('routes:password_reset'), headerTitleAlign: "left" }}
              />
              <UserStack.Screen
                name={"Payment"}
                component={PaymentScreen}
                options={{ headerShown: true, headerTitle: t('routes:payment'), headerTitleAlign: "left" }}
              />
              <UserStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerShown: true,
                  headerTitle: t('routes:settings') }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <UserStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <UserStack.Screen
            name={"SignUpPt1"}
            component={SignUpPt1Screen}
            options={{ headerShown: true }}
          />
          <UserStack.Screen
            name={"SignUpPt2"}
            component={SignUpPt2Screen}
            options={{ headerShown: true }}
          />
          <UserStack.Screen
            name={"Payment"}
            component={PaymentScreen}
            options={{ headerShown: true, headerTitle: 'Payment', headerTitleAlign: "left" }}
          />
          <UserStack.Screen
            name={"ForgetPassword"}
            component={ForgetPasswordScreen}
            options={{ headerShown: true, headerTitle: 'Password Reset', headerTitleAlign: "left" }}
          />
          <UserStack.Screen
            name="Contact"
            component={ContactScreen}
            options={{ headerShown: true,
              headerTitle: t('routes:contact') }}
          />
          <UserStack.Screen
            name="FloorsListShare"
            component={FloorListShareScreen}
            options={{
              headerShown: false,
              headerTitle: t('routes:slct_list')
            }}
          />
          <UserStack.Screen
            name="Shares"
            component={SharesScreen}
            options={{ headerShown: true,
              headerTitle: t('routes:shares') }}
          />
          <UserStack.Screen
            name="Subscription"
            component={SubscriptionScreen}
            options={{ headerShown: false,
              headerTitle: t('routes:subscription') }}
          />
          <UserStack.Screen
            name="Legal"
            component={LegalScreen}
            options={{ headerShown: true,
              headerTitle: t('routes:legal') }}
          />
          <UserStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: true,
              headerTitle: t('routes:settings') }}
          />
        </>
      )}
    </UserStack.Navigator>
  );
};

export default UserStackScreen;
