import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, Map, Settings, Shelters} from '../screens';
import InfoNavigation from './InfoNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


function HomeNavigation({route}) {
    const name = route.params.username;
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
                    } else if (route.name === 'InfoNavigation') {
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
            <Tab.Screen name="Account" component={Account} initialParams={{username: name}} options={{headerShown: false}}/>
            <Tab.Screen name="Shelters" component={Shelters} options={{headerShown: false}}/>
            <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
            <Tab.Screen name="InfoNavigation" component={InfoNavigation} options={{headerShown: false}}/>
            <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

export default HomeNavigation;