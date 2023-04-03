import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';

class Shelters extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.space}/>

                <Text style={styles.body}>Placeholder</Text>
            </SafeAreaView>
        );
    }
}

export default Shelters;

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
});