import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountAdmin, Map, Info, Settings, Shelters} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


export default function HomeAdminNavigation({route}) {
    const {email, firstName } = route.params;
    console.log(Tab);
    return (
        <Tab.Navigator
            initialRouteName="Account"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Account') {
                        iconName = focused ? 'ios-person' : 'ios-person-outline';    
                    } else if (route.name === 'Shelters') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'ios-map' : 'ios-map-outline';  
                    } else if (route.name === 'Info') {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Account" component={AccountAdmin} initialParams={{firstName: firstName}} options={{headerShown: false}}/>
            <Tab.Screen name="Shelters" component={Shelters} options={{headerShown: false}}/>
            <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
            <Tab.Screen name="Info" component={Info} options={{headerShown: false}}/>
            <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}