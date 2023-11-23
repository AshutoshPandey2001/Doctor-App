/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import TodayPatients from './src/pages/TodayPatients';
import AllPatients from './src/pages/AllPatients';
import DoctorPriscription from './src/pages/DoctorPriscription';
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store';
import { GlobalStyle } from './src/globalStyle';
import TodayPatientsStack from './src/navigator/TodayPatientsStack';
import AllPatientsStack from './src/navigator/AllPatientsStack';




function App(): JSX.Element {
  const [isLoggedIn, setIsLogged] = useState(true);
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  const { isLoading } = useSelector((state: RootState) => state.isLoading)

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading &&
        <View style={[GlobalStyle.container, GlobalStyle.horizontal]}>
          <ActivityIndicator size={'large'} />
        </View>
      }
      <View style={{ height: '100%', backgroundColor: '#fff' }}>
        <NavigationContainer theme={navTheme}>
          {isLoggedIn ?
            <Tab.Navigator tabBar={(props: any) => <Tabs {...props} />} backBehavior='history'
              screenOptions={() => ({
                tabBarShowLabel: false,
              })}
            >
              <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Tab.Screen name="Today" component={TodayPatientsStack} options={{ headerShown: false }} />
              <Tab.Screen name="All" component={AllPatientsStack} options={{ headerShown: false }} />
              {/* <Tab.Screen name="DoctorPriscription" component={DoctorPriscription}
                options={{
                  headerShown: false,
                  tabBarStyle: {
                    display: "none",
                  },
                  tabBarButton: () => null,
                }}
              /> */}
            </Tab.Navigator>
            :
            (<Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Auth" options={{ headerShown: false }}
                component={AuthNavigator} />
            </Stack.Navigator>)
          }
        </NavigationContainer>
      </View>
    </SafeAreaView>
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
