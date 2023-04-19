import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, StatusBar, SafeAreaView, ScrollView, Alert, Button} from 'react-native';
import { db } from '../../../../FirebaseConfig';
import { ref, update } from 'firebase/database'

export default class EditContactInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            isEmail: false,
            phone: null,
        };
    }

    onUpdate() {
        const regEmail = RegExp(/^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/g);
        const {email, phone} = this.state;

        if (email === '' || phone === null) {
            Alert.alert('Error: An entry is empty.', `Please fill in all required entries.`);
        } else if (!regEmail.test(email)) {
            Alert.alert('Error: Email is incorrect', `Please input a valid email address.`);
        } else {
            update(ref(db, 'Users/' + this.props.route.params.username + '/'), {
                email: email,
                phone: phone,
            });
            this.props.navigation.navigate('SettingsHome');
        }
    }

    render() {  
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.descText}>Account Information</Text>
                    {/* Email input box */}
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder={'Email Address'}
                        style={styles.input}
                        inputMode='email'
                    />
                    {/* Phone input box */}
                    <TextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        placeholder={'Phone Number (XXX-XXX-XXXX)'}
                        style={styles.input}
                        inputMode='tel'
                    />
                    {/* Confirm update button */}
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