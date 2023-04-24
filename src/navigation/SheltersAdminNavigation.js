import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SheltersAdmin, SheltersAdminInfo, SheltersAdminCreation} from '../screens';

const Stack = createNativeStackNavigator();

export default function SheltersAdminNavigation({route}) {
    const {username} = route.params
    console.log(Stack);
    return (
        <Stack.Navigator initialRouteName="SheltersAdmin">
            <Stack.Screen name="SheltersAdmin" component={SheltersAdmin} initialParams= {{username: username}} options={{headerShown: false}}/>
            <Stack.Screen name="SheltersAdminInfo" component={SheltersAdminInfo} options={{headerShown: false}}/>
            <Stack.Screen name="SheltersAdminCreation" component={SheltersAdminCreation} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}