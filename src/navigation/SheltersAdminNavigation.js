import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SheltersAdmin, SheltersAdminCreation} from '../screens';

const Stack = createNativeStackNavigator();

export default function SheltersAdminNavigation() {
    console.log(Stack);
    return (
        <Stack.Navigator initialRouteName="SheltersAdmin">
            <Stack.Screen name="SheltersAdmin" component={SheltersAdmin} options={{headerShown: false}}/>
            <Stack.Screen name="SheltersAdminCreation" component={SheltersAdminCreation} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}