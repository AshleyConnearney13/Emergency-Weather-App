import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';

class Account extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.space}/>
                
                <View style={styles.textBackground}>
                    <Text style={styles.header}>Welcome, {this.props.route.params.username}.</Text>
                </View>

                <View style={styles.space}/>

                <View style={styles.textBackground}>
                    <Text style={styles.header}>You are in Zone A.</Text>
                </View>

                <View style={styles.space}/>

                <View style={styles.textBackground}>
                    <Text style={styles.header}>Shelters near you:</Text>
                    <Text style={styles.body}>Example 1: 123 Test Lane... (3.8 mi)</Text>
                    <Text style={styles.body}>Example 2: 456 Test Place... (6.7 mi)</Text>
                    <Text style={styles.body}>Example 3: 7890 Test Ave... (12.4 mi)</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default Account;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
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