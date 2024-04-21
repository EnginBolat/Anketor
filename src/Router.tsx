import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthStack, HomeStack } from './stack';
import { QuestionPage } from './pages';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth'>
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
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
    </GestureHandlerRootView>
  );
}

export default App;