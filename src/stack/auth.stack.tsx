import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SignIn, SignUp } from '../pages';

const AboutStack = createNativeStackNavigator();

function AboutStackScreen() {
    return <AboutStack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerTitleAlign: 'center' }}>
        <AboutStack.Screen
            name="SignIn"
            component={SignIn}
            options={{
                headerShown: false,
            }}
        />
        <AboutStack.Screen
            name='SignUp'
            component={SignUp}
            options={{
                headerShown: false,
            }}
        />
    </AboutStack.Navigator >
}

export default AboutStackScreen;