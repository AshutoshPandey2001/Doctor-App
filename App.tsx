/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigator/AuthNavigator';
import 'react-native-gesture-handler';
import Tabs from './src/navigator/MenuNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './src/redux/store';
import { GlobalStyle } from './src/globalStyle';
import TodayPatientsStack from './src/navigator/TodayPatientsStack';
import AllPatientsStack from './src/navigator/AllPatientsStack';
import Header from './src/component/Header';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { setLoading } from './src/redux/action/UiSlice';
import Icon from 'react-native-easy-icon';
import FloatingButton from './src/component/FloatingButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddPatientsStack from './src/navigator/AddPatientsStack';
const adUnitId: any = 'ca-app-pub-8691082301379909/8658058910';

function App(): JSX.Element {
  const [isLoggedIn, setIsLogged] = useState(false);
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  const { isLoading, tabBar } = useSelector((state: RootState) => state.ui)
  const user: any = useSelector((state: RootState) => state.user)
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch()
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      // If not authorized or provisional, request permission
      const newAuthStatus = await messaging().requestPermission();
      const newEnabled =
        newAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        newAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (newEnabled) {
        console.log('Authorization status:', newAuthStatus);
      } else {
        console.log('User denied permission.');
        // Handle the case where the user denies permission.
      }
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken()
  }
  const onDisplayNotification = async (notification: any) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()
    console.log('i am running on display Notification');

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: notification.ttl,
      name: notification.ttl,
      sound: 'default',
      importance: AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
      title: notification.notification.title,
      body: notification.notification.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  // async function onCreateTriggerNotification() {
  //   const date = new Date(Date.now());
  //   date.setHours(17);
  //   date.setMinutes(12);

  //   // Create a time-based trigger
  //   const trigger: TimestampTrigger = {
  //     type: TriggerType.TIMESTAMP,
  //     timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
  //     repeatFrequency: 1
  //   };

  //   // Create a trigger notification
  //   await notifee.createTriggerNotification(
  //     {
  //       title: 'Good Morning',
  //       body: 'Please Check Patients List',
  //       android: {
  //         channelId: 'your-channel-id',
  //       },
  //     },
  //     trigger,
  //   );
  // }
  useEffect(() => {
    if (user?.user) {
      console.log('user?.user', user?.user);
      // requestUserPermission()
      // getToken()
      setIsLogged(true)
      dispatch(setLoading(false))

    } else {
      setIsLogged(false)
      dispatch(setLoading(false))

    }
  }, [user])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification on open app', remoteMessage.notification);
      // remoteMessage.notification
      // onDisplayNotification(remoteMessage.notification)
    });

    return unsubscribe;
  }, []);
  const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification on foreground', remoteMessage.notification);
      // remoteMessage.notification
      // onDisplayNotification(remoteMessage.notification)

    })
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification on quit mode', remoteMessage.notification);
        // remoteMessage.notification
        // onDisplayNotification(remoteMessage.notification)

      }
    })
  }
  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, [])

  // useEffect(() => {
  //   const handleBackgroundEvent = async () => {
  //     // Subscribe to background events
  //     await notifee.onBackgroundEvent(async ({ type, detail }) => {
  //       if (type === EventType.DELIVERED || type === EventType.PRESSED) {
  //         // Handle notification delivery or press events in the background
  //         console.log('Received background event:', type, detail.notification);
  //         // You can add your logic to handle background events here
  //       }
  //     });
  //   };

  //   handleBackgroundEvent();

  //   // Ensure to clean up the subscription when the component unmounts
  //   return () => {
  //     notifee.onBackgroundEvent();
  //   };
  // }, []);

  // useEffect(() => {
  //   // Subscribe to app state changes to handle when the app is in the background
  //   const handleAppStateChange = (nextAppState: string) => {
  //     if (nextAppState === 'background') {
  //       // Perform actions when the app is in the background
  //       console.log('App is in the background');
  //       // You can add your background-related logic here
  //     }
  //   };

  //   AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   const scheduleNotification = async (hour, minute, title, body) => {
  //     // ... (same function as mentioned in the previous example)

  //     // Schedule notification at a specific time
  //     const date = new Date();
  //     date.setHours(hour, minute, 0, 0); // Set the desired time

  //     await notifee.createAlarm({
  //       channelId,
  //       title,
  //       body,
  //       fireDate: date.getTime(),
  //       repeatInterval: 'day', // Repeat daily
  //     });
  //   };

  //   // Schedule notifications at specific times
  //   onDisplayNotification(10, 0, 'Notification Title for 10 am', 'Notification body for 10 am');
  //   scheduleNotification(14, 0, 'Notification Title for 2 pm', 'Notification body for 2 pm');
  //   scheduleNotification(17, 0, 'Notification Title for 5 pm', 'Notification body for 5 pm');

  //   // Background execution to check for notifications at specific intervals
  //   const intervalId = BackgroundTimer.setInterval(() => {
  //     // Check the current time and trigger notifications if needed
  //     // Use the same logic as the scheduling function here
  //   }, 60000); // Check every minute

  //   // Remember to clear the interval when the component unmounts
  //   return () => {
  //     BackgroundTimer.clearInterval(intervalId);
  //   };
  // }, []);
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
            <>
              <Tab.Navigator tabBar={(props: any) => <View style={{ display: tabBar ? 'flex' : 'none' }}><Tabs {...props} /></View>} backBehavior='history'
                screenOptions={() => ({
                  tabBarShowLabel: false,
                  tabBarStyle: GlobalStyle.tabBar,
                  headerShown: tabBar, // Show header for all screens
                  header: () => (
                    // Customize your header here
                    <Header />
                  ),
                })}
              >
                <Tab.Screen name="Home" component={Home} options={{ headerShown: tabBar }} />
                <Tab.Screen name="Today" component={TodayPatientsStack} options={{ headerShown: tabBar }} />
                <Tab.Screen name="All" component={AllPatientsStack} options={{ headerShown: tabBar }} />
                {/* <Tab.Screen
                  name="Addpatients"
                  component={AddPatientsStack}
                  options={{
                    tabBarStyle: { display: "none" },
                    headerTitle: 'Addpatients',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
                    headerShadowVisible: false,
                    tabBarButton: () => null
                  }}

                /> */}

              </Tab.Navigator>
              {
                user?.user?.permissions && user?.user?.permissions.find((permission: any) => permission.module === "PATIENTS") &&
                <View style={{ display: tabBar ? 'flex' : 'none' }}>
                  <GestureHandlerRootView>
                    <FloatingButton />
                  </GestureHandlerRootView>
                </View>
              }


            </>
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
