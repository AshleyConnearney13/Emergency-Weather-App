import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShelterPreparations, RecommendedSupplies, CurrentWeatherAdvisory} from '../screens';
import HomeNavigation from './HomeNavigation';

const Stack = createNativeStackNavigator();

function InfoNavigation() {
    console.log(Stack);
    return (
        <Stack.Navigator initialRouteName="Info">
            <Stack.Screen name="CurrentWeatherAdvisory" component={CurrentWeatherAdvisory} options={{headerShown: false}}/>
            <Stack.Screen name="RecommendedSupplies" component={RecommendedSupplies} options={{headerShown: false}}/>
            <Stack.Screen name="ShelterPreparations" component={ShelterPreparations} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default InfoNavigation;