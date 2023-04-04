import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, StatusBar, SafeAreaView, ScrollView, Alert, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database'

export default class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            isEmail: false,
            username: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: '',
            middleName: '',
            phone: null,
            open: false,
            value: null,
            accountType: null,
            items: [{label: 'I am looking for a shelter.', value: 1}, {label: 'I am, or work for a shelter provider.', value: 2}],
            accountCreated: false,
        };

        this.setValue = this.setValue.bind(this);
    }

    setOpen(open) {
        this.setState({open});
    }
    
    setValue(callback) {
        this.setState(state => ({value: callback(state.value)}));
    }
    
    setItems(callback) {
        this.setState(state => ({items: callback(state.items)}));
    }

    onRegister() {
        const regEmail = RegExp(/^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/g);
        const { username, email, password, repeatPassword, firstName, middleName, lastName, accountType, phone} = this.state;
        //Alert.alert('Credentials', `${email} + ${username} + ${password} + ${repeatPassword}`);
        if (username === '' || email === '' || password === '' || firstName === '' || lastName === '' || accountType === null || phone === null) {
            Alert.alert('Error: An entry is empty.', `Please fill in all required entries.`);
        }  else if (!regEmail.test(email)) {
            Alert.alert('Error: Email is incorrect', `Please input a valid email address.`);
        } else if (password !== repeatPassword) {
            Alert.alert('Error: Passwords do not match', `Please re-enter password.`);
        } else {
            set(ref(db, 'Users/' + username + '/'), {
                accountType: accountType,
                username: username,
                email: email,
                password: password,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                phone: phone,
            });
            createUserWithEmailAndPassword(auth, email, password);
            if (accountType === 2) {
                Alert.alert('Registration information saved.', `Please wait for your account to be authenticated before logging in.`);
            } else {
                Alert.alert('Registration information saved.', `Please re-enter login information.`);
            }
            this.props.navigation.navigate('SignIn');
        }
    }

    render() {  
        const { open, value, items } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.headerText}>Create an Account</Text>
                    
                    <Text style={styles.descText}>Account Information</Text>
                    {/* Username input box */}
                    <TextInput
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder={'Username'}
                        style={styles.input}
                    />
                    {/* Email input box */}
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder={'Email Address'}
                        style={styles.input}
                        inputMode='email'
                    />
                    {/* Password input box */}
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    {/* Repeat password input box */}
                    <TextInput
                        value={this.state.repeatPassword}
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                        placeholder={'Re-enter Password'}
                        secureTextEntry={true}
                        style={styles.input}
                    />

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
                    {/* Phone input box */}
                    <TextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        placeholder={'Phone Number XXX-XXX-XXXX'}
                        style={styles.input}
                        inputMode='tel'
                    />

                    
                    <Text style={styles.descText}>Account Type</Text>
                    {/* Account type dropdown selector */}
                    <DropDownPicker
                        style={styles.input}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={this.setOpen.bind(this)}
                        setValue={this.setValue.bind(this)}
                        onChangeValue={(accountType) => this.setState({ accountType })}
                        setItems={this.setItems.bind(this)}
                        dropDownDirection="AUTO"
                        bottomOffset={100}
                        listMode='MODAL'
                        modalAnimationType="slide"
                    />
                    
                    {/* Confirm registration button */}
                    <Button
                        title={'Register Account'}
                        style={styles.input}
                        onPress={this.onRegister.bind(this)}
                    />
                    
                    {/* Style that adds empty space */}
                    <View
                        style={styles.space}
                    />

                    {/* Go back to login page button */}
                    <Button
                        title={'Go Back'}
                        style={styles.input}
                        onPress={() => this.props.navigation.navigate('SignIn')}
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