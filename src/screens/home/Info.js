import React, { Component } from 'react';
import {StyleSheet, View, SafeAreaView, Button, StatusBar} from 'react-native';

export default class Info extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Button
                    title={'Current Weather Advisory'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('CurrentWeatherAdvisory')}
                />
                <View style={styles.space}/>
                <Button
                    title={'Recommended Supplies'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('RecommendedSupplies')}
                />
                <View style={styles.space}/>
                <Button
                    title={'Shelter Preparations'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('ShelterPreparations')}
                />
                <View style={styles.space}/>
                <Button
                    title={'Personal Reminders'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('PersonalReminders')}
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
    space: {
        width: 20,
        height: 20,
    },
});