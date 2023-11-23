import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import LoginPage from '../pages/Login/Login';
import TodayPatients from '../pages/TodayPatients';
import DoctorPriscription from '../pages/DoctorPriscription';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { GlobalStyle } from '../globalStyle';
import { useDispatch } from 'react-redux';
import { setTabBar } from '../redux/action/UiSlice';

const Patientstack = createNativeStackNavigator();

const TodayPatientsStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "DoctorPriscription") {
            dispatch(setTabBar(false))
            navigation.setOptions({ tabBarStyle: GlobalStyle.noTabBar });
        } else {
            dispatch(setTabBar(true))
            navigation.setOptions({ tabBarStyle: GlobalStyle.tabBar });
        }
    }, [navigation, route])
    return (
        <Patientstack.Navigator initialRouteName="TodayPatients" screenOptions={{
            contentStyle: {
                backgroundColor: '#fff'
            }
        }}>
            <Patientstack.Screen options={{ headerShown: false }} name="TodayPatients" component={TodayPatients} />
            <Patientstack.Screen options={{ headerShown: false }} name="DoctorPriscription" component={DoctorPriscription} />

        </Patientstack.Navigator>
    )
}

export default TodayPatientsStack