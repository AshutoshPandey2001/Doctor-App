import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import LoginPage from '../pages/Login/Login';
import DoctorPriscription from '../pages/DoctorPriscription';
import AllPatients from '../pages/AllPatients';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { GlobalStyle } from '../globalStyle';
import { setTabBar } from '../redux/action/UiSlice';
import { useDispatch } from 'react-redux';
import FloatingButton from '../component/FloatingButton';
const Patientstack = createNativeStackNavigator();

const AddPatientsStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        console.log(routeName, 'routeName');
        if (routeName === "DoctorPriscription") {
            dispatch(setTabBar(false))
            navigation.setOptions({ tabBarStyle: GlobalStyle.noTabBar });
        } else {
            dispatch(setTabBar(true))
            navigation.setOptions({ tabBarStyle: GlobalStyle.tabBar });
        }
    }, [navigation, route])
    return (
        <Patientstack.Navigator screenOptions={{
            contentStyle: {
                backgroundColor: '#fff'
            }
        }}>
            <Patientstack.Screen options={{ headerShown: false }} name="AddPatients" component={FloatingButton} />
            <Patientstack.Screen options={{ headerShown: false }} name="DoctorPriscription" component={DoctorPriscription} />

        </Patientstack.Navigator>
    )
}

export default AddPatientsStack