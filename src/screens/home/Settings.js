import React, { Component } from 'react'; 
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { getAuth, signOut } from "firebase/auth";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.logOutUser = this.logOutUser.bind(this);
    }

    logOutUser() {
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Button
                    title={'Edit Personal Info'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('EditPersonalInfo')}
                />
                <View style={styles.space}/>
                <Button 
                    title={'Edit Contact Info'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('EditContactInfo')}
                />
                <View style={styles.space}/>
                <Button
                    title={'Log Out'}
                    style={styles.input}
                    onPress={this.logOutUser()}
                />
            </SafeAreaView> 
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //alignItems: 'center',
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
