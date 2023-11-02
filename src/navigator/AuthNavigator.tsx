import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from '../pages/Login/Login';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            contentStyle: {
                backgroundColor: '#fff'
            }
        }}>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />

        </Stack.Navigator>
    )
}

export default AuthNavigator