import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button, StatusBar, Linking} from 'react-native';

export default class CurrentWeatherAdvisory extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.textBackground}>
                    <Text style={styles.header}>
                        Please click{' '}
                            <Text style={styles.textLink} onPress={() => {Linking.openURL('https://weather.gov/mlb/')}}>
                                HERE
                            </Text>{' '}
                        to view the current Volusia County weather report.
                    </Text>
                </View>
                <View style={styles.space}/>
                <Button
                    title={'Go Back'}
                    onPress={() => this.props.navigation.navigate('InfoHome')}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent:'center'
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
    space: {
        width: 20,
        height: 20,
    },
    textLink: {
        color: '#36B37E',
        textDecorationLine: 'underline',
    },
});