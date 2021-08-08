
import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { getFocusedRouteNameFromRoute, NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../src/firebase/config';

import HomeStackScreen from './stacks/HomeStack';
import UserStackScreen from './stacks/UserStack';
import FloorStackScreen from './stacks/FloorStack';
import { useUser } from 'context/UserContext';
import NetInfo from "@react-native-community/netinfo";
import { useNetwork } from 'context/NetworkContext';
import AuthStackScreen from './stacks/AuthStack';
import { View } from 'components/common/View';
import SplashScreen from 'app/SplashScreen';
import VerifyEmailModal from 'components/shared/VerifyEmailModal';
import { useModal } from 'context/ModalContext';


const Tab = createBottomTabNavigator();

const AppNavigation = () => {

  const { user, setUser, access, setAccess } = useUser();
  const [loading, setLoading] = useState(false)
  const { setConnectionType, setIsConnected, isConnected } = useNetwork();
  const usersRef = firebase.firestore().collection('users');
  const [emailVerified, setEmailVerified] = useState();
  const {emailModal, setEmailModal} = useModal();

  console.log(`IS IT TRUE HGBF ${emailModal}`)



  const fetchUser = async () => {
    setLoading(true)
    try {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setEmailVerified(currentUser.emailVerified)
          setUser(currentUser.uid)
          setLoading(false);
          if (user !== null) {
            setLoading(false);
          }
        } else {
          setEmailVerified(false)
          setLoading(false)
          console.log('No User logged im')
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const getUserAccess = async () => {
    try {
      let doc = await usersRef.doc(user).get()
      if (doc.exists) {
        console.log("*******USER DOCCCCC", doc.data())
        await setAccess(doc.data().profile.accountType)
        console.log("FIND USER ACCESS", access)
      } else {
        await console.log(`[ERROR] User not loaded`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Subscribe
  const unsubscribe = NetInfo.addEventListener(state => {
    setConnectionType(state.type)
    setIsConnected(state.isConnected)

  });

  // Unsubscribe
  unsubscribe();

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    getUserAccess()
  }, [user])

  const isTabBarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ['SignUpPt1', 'SignUpPt2', 'Project', 'List', 'Store', 'Contact', 'Shares', 'Settings', 'Subscription', 'Legal', 'FloorsSearched', 'FloorsListShare']
    if (hideOnScreens.includes(routeName)) return false;
    return true;
  };

  if (loading) {
    return (
      <SplashScreen />
    )
  } else {
    return (
      <NavigationContainer>
        <VerifyEmailModal
          transparent={true}
          animationType="fade"
          visible={emailModal}
          setVisible={setEmailModal}
        />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'User') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Floor') {
                iconName = focused ? 'layers' : 'layers-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarVisible: isTabBarVisible(route)
          })}
          tabBarOptions={{
            activeTintColor: '#328ABE',
            inactiveTintColor: '#FFFFFF',
            inactiveBackgroundColor: '#214975',
            activeBackgroundColor: '#214975',
            showLabel: false,
            //safeAreaInsets: {top: 0, right: 0, left: 0, bottom: 0},
            style: { backgroundColor: '#214975' },
          }}
        ><>
            {
              (!user || user == '') || emailVerified == false ?
                <>
                  <Tab.Screen name="Auth" component={AuthStackScreen} options={{ tabBarVisible: false }} />
                </>
                :
                <>

                  <Tab.Screen name="Floor" component={FloorStackScreen} />
                  <Tab.Screen name="User" component={UserStackScreen} />
                </>
            }


          </>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;