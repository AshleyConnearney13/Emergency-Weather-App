import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import Hyperlink from 'react-native-hyperlink';

const App = () => {
    const onLinkPressed = () => {
      Linking.openURL('https://forecast.weather.gov/MapClick.php?lat=29.0475&lon=-81.162#.ZC20csLMIYg')
    };
}

class CurrentWeatherAdvisory extends Component {

    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                
        <Text style={styles.textMsg}>
        Please click{' '}
        <Text style={styles.textLink}
         onPress={() => {
          Linking.openURL('https://forecast.weather.gov/MapClick.php?lat=29.0475&lon=-81.162#.ZC20csLMIYg')
         }}>
        HERE
        </Text>{' '}
        to view the current Volusia County weather report.
         </Text>
         
        </SafeAreaView>
        );
         
    }
}

export default CurrentWeatherAdvisory;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    textBackground: {
        borderRadius: 20,
        width: '90%',
        padding: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.1)'
    },
    header: {
        fontSize: 35,
        lineHeight: 50,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '90%',
    },
    body: {
        fontSize: 20,
        lineHeight: 35,
        color: 'black',
        textAlign: 'left',
        width: '90%',
    },
    space: {
        width: 20,
        height: 20,
    },
    textMsg: {
        width: 250,
        fontSize: 16,
        fontWeight: '600',
        color: '#212B36',
        textAlign: 'center',
      },
    textLink: {
        color: '#36B37E',
        textDecorationLine: 'underline',
      },
});