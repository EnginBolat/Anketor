import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Auth, ForgotPassword, Kvkk } from '../pages';

const AboutStack = createNativeStackNavigator();

function AboutStackScreen() {
    return <AboutStack.Navigator
        initialRouteName="AuthPage"
        screenOptions={{ headerTitleAlign: 'center' }}>
        <AboutStack.Screen
            name="AuthPage"
            component={Auth}
            options={{
                headerShown: false,
            }}
        />
        <AboutStack.Screen
            name='ForgotPasswordPage'
            component={ForgotPassword}
            options={{
                headerShown: true,
                title: '',
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerTransparent: true,
            }}
        />
        <AboutStack.Screen
            name='KvkkPage'
            component={Kvkk}
            options={{
                headerShown: true,
                title: '',
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerTransparent: true,
            }}
        />
    </AboutStack.Navigator >
}

export default AboutStackScreen;