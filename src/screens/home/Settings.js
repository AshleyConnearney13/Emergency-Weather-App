import React, { Component } from 'react'; 
import {StyleSheet, View, SafeAreaView, Button, StatusBar} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import * as Updates from 'expo-updates';

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }

    logOutUser() {
        const auth = getAuth();
            signOut(auth).then(() => {
                console.log('Signed out');
                Updates.reloadAsync();
            }).catch((error) => {
                
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Button
                    title={'Edit Personal Info'}
                    onPress={() => this.props.navigation.navigate('EditPersonalInfo')}
                />
                <View style={styles.space}/>
                <Button 
                    title={'Edit Contact Info'}
                    onPress={() => this.props.navigation.navigate('EditContactInfo')}
                />
                <View style={styles.space}/>
                <Button
                    title={'Log Out'}
                    onPress={this.logOutUser.bind(this)}
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
    space: {
        width: 20,
        height: 20,
    },
});
