import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Shelters, SheltersInfo} from '../screens';

const Stack = createNativeStackNavigator();

export default function SheltersNavigation({route}) {
    console.log(Stack);
    return (
        <Stack.Navigator initialRouteName="SheltersHome">
            <Stack.Screen name="SheltersHome" component={Shelters} options={{headerShown: false}}/>
            <Stack.Screen name="SheltersInfo" component={SheltersInfo} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}