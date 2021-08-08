import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'app/home/HomeScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}/>
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;
