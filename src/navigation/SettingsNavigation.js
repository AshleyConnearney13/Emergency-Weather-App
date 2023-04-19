import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings, EditContactInfo, EditPersonalInfo} from '../screens';

const Stack = createNativeStackNavigator();

export default function SettingsNavigation({route}) {
    const {username} = route.params;
    console.log(Stack);
    return (
        <Stack.Navigator initialRouteName="SettingsHome">
            <Stack.Screen name="SettingsHome" component={Settings} initialParams={{username: username}} options={{headerShown: false}}/>
            <Stack.Screen name="EditContactInfo" component={EditContactInfo} initialParams={{username: username}} options={{headerShown: false}}/>
            <Stack.Screen name="EditPersonalInfo" component={EditPersonalInfo} initialParams={{username: username}} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}