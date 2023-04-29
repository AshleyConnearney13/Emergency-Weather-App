import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, StatusBar, SafeAreaView, ScrollView, Alert, Button} from 'react-native';
import { db } from '../../../../FirebaseConfig';
import { ref, update } from 'firebase/database'

export default class EditPersonalInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: '',
            lastName: '',
            middleName: '',
        };
        console.log(this.props.route.params.username);
    }

    onUpdate() {
        const { firstName, middleName, lastName } = this.state;
        if (firstName === '' || lastName === '') {
            Alert.alert('Error: An entry is empty.', `Please fill in all required entries.`);
        }  else {
            update(ref(db, 'Users/' + this.props.route.params.username + '/'), {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
            });
            this.props.navigation.navigate('SettingsHome');
        }
    }

    render() { 
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.descText}>Personal Information</Text>
                    {/* First name input box */}
                    <TextInput
                        value={this.state.firstName}
                        onChangeText={(firstName) => this.setState({ firstName })}
                        placeholder={'First Name'}
                        style={styles.input}
                    />
                    {/* Middle name input box */}
                    <TextInput
                        value={this.state.middleName}
                        onChangeText={(middleName) => this.setState({ middleName })}
                        placeholder={'Middle Name (optional)'}
                        style={styles.input}
                    />
                    {/* Last name input box */}
                    <TextInput
                        value={this.state.lastName}
                        onChangeText={(lastName) => this.setState({ lastName })}
                        placeholder={'Last Name'}
                        style={styles.input}
                    />
                    
                    {/* Confirm registration button */}
                    <Button
                        title={'Update Info'}
                        style={styles.input}
                        onPress={this.onUpdate.bind(this)}
                    />
                    
                    {/* Style that adds empty space */}
                    <View
                        style={styles.space}
                    />

                    {/* Go back to login page button */}
                    <Button
                        title={'Go Back'}
                        style={styles.input}
                        onPress={() => this.props.navigation.navigate('SettingsHome')}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        width: 380,
        //height: 40,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'baseline',       
    },
    headerText: {
        fontSize: 40,
        lineHeight: 50,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '90%',
    },
    descText: {
        fontSize: 20,
        lineHeight: 45,
        color: 'black',
        fontWeight: 'normal',
        textAlign: 'left',
        width: '90%',
    },
    space: {
        width: 20,
        height: 7,
    },
});