/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import LoginPage from './src/pages/Login/Login';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigator/AuthNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Tabs from './src/navigator/MenuNavigator';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  const [isLoggedIn, setIsLogged] = useState(true);


  return (
    <View style={{ height: '100%' }}>
      <NavigationContainer theme={DefaultTheme}>
        {isLoggedIn ?
          <Tabs /> :
          (<Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Auth" options={{ headerShown: false }}
              component={AuthNavigator} />
          </Stack.Navigator>)
        }
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
