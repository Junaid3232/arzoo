import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import FloorScreen from 'app/floor/FloorScreen';
import StoreScreen from 'app/store/StoreScreen';
import SelectFloorScreen from 'app/floor/SelectFloorScreen';
import { useNavigation } from '@react-navigation/native';
import { useUser } from 'context/UserContext';
import { firebase } from '../../firebase/config';
import useTheme from 'hooks/useTheme';
import StoreHeader from 'components/store/StoreHeader';
import ContactScreen from '../../app/user/ContactScreen'
import FloorsSearched from 'app/floor/FloorsSearchedScreen';
import FloorListShareScreen from 'app/floor/FloorListShareScreen';
import { useTranslation } from 'react-i18next';

const FloorStack = createStackNavigator();
const FloorStackScreen = ({ route }) => {
    const navigation = useNavigation()
    const { user } = useUser();
    const { t } = useTranslation();
    const theme = useTheme();
    const db = firebase.firestore()
    const headerStyle = {
        headerStyle: {
            backgroundColor: theme.primaryDark,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
    }
    return (
        <FloorStack.Navigator
            screenOptions={{
                ...headerStyle,
            }}
            headerMode="screen">
            <FloorStack.Screen
                name="Floor"
                component={FloorScreen}
                options={{ headerShown: false }}
            />
            <FloorStack.Screen
                name="FloorsSearched"
                component={FloorsSearched}
                options={{
                    headerShown: false,
                    headerTitle: t('routes:results')
                }}
            />
            <FloorStack.Screen
                name="Store"
                component={StoreScreen}
                options={{
                    headerShown: true,
                    header: ({ scene, previous, navigation }) => {
                        const { options } = scene.descriptor;
                        const title =
                            options.headerTitle !== undefined
                                ? options.headerTitle
                                : options.title !== undefined
                                    ? options.title
                                    : scene.route.name;
                        return (
                            <StoreHeader
                                title={title}
                                navigation={navigation}
                            />
                        );
                    }
                }} />
            <FloorStack.Screen
                name="List"
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack()
                            }}
                        ></HeaderBackButton>
                    ),
                    headerTitle: t('routes:list')
                }}
            >
                {props => <SelectFloorScreen />}
            </FloorStack.Screen>
            <FloorStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    headerShown: true,
                    headerTitle: t('routes:contact')
                }}
            />
        </FloorStack.Navigator>
    );
}

export default FloorStackScreen;
