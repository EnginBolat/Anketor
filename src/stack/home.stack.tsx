import React from 'react';
import { Home, Profile } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IcHome, IcUser } from '../assets';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';

const HomeStack = createBottomTabNavigator();

function HomeStackScreen() {
    const { t, i18n } = useTranslation();

    const changeLanguageHandler = () => {
        if (i18n.language == "tr") {
            i18n.changeLanguage("en")
        } else {
            i18n.changeLanguage("tr")
        }
    }



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
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerRight(props) {
                    return <TouchableOpacity onPress={changeLanguageHandler} className='mr-5'>
                        <Text>{i18n.language.toUpperCase()}</Text>
                    </TouchableOpacity>
                },
                tabBarLabel: ({ focused }) => null,
                tabBarIcon: ({ focused }) => (
                    <IcUser height={28} width={28} style={{ marginBottom: focused ? 12 : 0 }} />
                ),
            }}
        />
    </HomeStack.Navigator >
}

export default HomeStackScreen;