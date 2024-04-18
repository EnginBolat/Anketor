import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './stack';
import { Home, Profile, QuestionPage } from './pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IcHome, IcUser } from './assets';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName='HomePage'>
      <Tab.Screen
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
      <Tab.Screen
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
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
        <Stack.Screen name="Question"
          component={QuestionPage}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: 'black'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;