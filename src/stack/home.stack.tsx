import React from 'react';
import { Home, Profile } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IcHome, IcUser } from '../assets';

const HomeStack = createBottomTabNavigator();

function HomeStackScreen() {
    return <HomeStack.Navigator initialRouteName='HomePage'>
        <HomeStack.Screen
            name="HomePage"
            component={Home}
            options={{
                headerShown: false,
                tabBarLabel: ({ focused }) => null,
                tabBarIcon: ({ focused }) => (
                    <IcHome height={28} width={28} style={{ marginBottom: focused ? 12 : 0 }} />
                ),
            }}
        />
        <HomeStack.Screen
            name="ProfilePage"
            component={Profile}
            options={{
                headerShown: false,
                tabBarLabel: ({ focused }) => null,
                tabBarIcon: ({ focused }) => (
                    <IcUser height={28} width={28} style={{ marginBottom: focused ? 12 : 0 }} />
                ),
            }}
        />
    </HomeStack.Navigator >
}

export default HomeStackScreen;