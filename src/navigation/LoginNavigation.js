import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register} from '../screens';
import HomeNavigation from './HomeNavigation';
import HomeAdminNavigation from './HomeAdminNavigation';

const Stack = createNativeStackNavigator();

export default function LoginNavigation() {
    console.log(Stack);
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="HomeAdmin" component={HomeAdminNavigation} options ={{headerShown: false}}/>
        </Stack.Navigator>
    );
}