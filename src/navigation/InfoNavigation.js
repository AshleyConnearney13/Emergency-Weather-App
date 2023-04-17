import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShelterPreparations, RecommendedSupplies, CurrentWeatherAdvisory, Info, PersonalReminders} from '../screens';

const Stack = createNativeStackNavigator();

function InfoNavigation() {
    console.log(Stack);
    return (
        <Stack.Navigator initialRouteName="Info">
            <Stack.Screen name="Info" component={Info} options={{headerShown: false}}/>
            <Stack.Screen name="CurrentWeatherAdvisory" component={CurrentWeatherAdvisory} options={{headerShown: false}}/>
            <Stack.Screen name="RecommendedSupplies" component={RecommendedSupplies} options={{headerShown: false}}/>
            <Stack.Screen name="ShelterPreparations" component={ShelterPreparations} options={{headerShown: false}}/>
            <Stack.Screen name="PersonalReminders" component={PersonalReminders} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default InfoNavigation;