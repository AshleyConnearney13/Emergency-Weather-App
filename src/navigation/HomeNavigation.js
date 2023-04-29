import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, Map} from '../screens';
import InfoNavigation from './InfoNavigation';
import SheltersNavigation from './SheltersNavigation';
import SettingsNavigation from './SettingsNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


export default function HomeNavigation({route}) {
    const {username} = route.params;
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
            <Tab.Screen name="Account" component={Account} initialParams={{username: username}} listeners={{beforeRemove: (e) => {e.preventDefault();}}} options={{headerShown: false}}/>
            <Tab.Screen name="Shelters" component={SheltersNavigation} initialParams={{username: username}} options={{headerShown: false}} listeners={({ navigation, route }) => ({
                tabPress: () => {
                    if(navigation.canGoBack()) {
                        navigation.navigate('Shelters');
                    }
                },
            })}/>
            <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
            <Tab.Screen name="Info" component={InfoNavigation} options={{headerShown: false}} listeners={({ navigation, route }) => ({
                tabPress: () => {
                    if(navigation.canGoBack()) {
                        navigation.navigate('Info');
                    }
                },
            })}/>
            <Tab.Screen name="Settings" component={SettingsNavigation} initialParams={{username: username}} options={{headerShown: false}} listeners={({ navigation, route }) => ({
                tabPress: () => {
                    if(navigation.canGoBack()) {
                        navigation.navigate('Settings');
                    }
                },
            })}/>
        </Tab.Navigator>
    );
}