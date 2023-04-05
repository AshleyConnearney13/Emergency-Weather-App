import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button} from 'react-native';
import { auth, db } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, child, get } from 'firebase/database'

export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            username: '',
            firstName: '',
            accountType: null,
        };

        this.onLogin = this.onLogin.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);
    }

    

    readDatabase() {
        const dbRef = ref(db);
        const { username, password, email, accountType } = this.state;
        
        if( username === '' || password === '') {
            Alert.alert('Error: Field is left blank', `Please fill in all text fields.`);
        } else {
            // Grabs corresponding first name from database
            get(child(dbRef, `Users/${username}/firstName`)).then((snapshot) => {
                if (snapshot.exists()) {
                    this.setState({ firstName: snapshot.val() })
                    console.log('firstName obtained from database: ' + this.state.firstName);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
            
            // Grabs corresponding email address from database
            get(child(dbRef, `Users/${username}/email`)).then((snapshot) => {
                if (snapshot.exists()) {
                    this.setState({ email: snapshot.val() })
                    console.log('Email obtained from database: ' + this.state.email);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

            get(child(dbRef, `Users/${username}/accountType`)).then((snapshot) => {
                if (snapshot.exists()) {
                    this.setState({ accountType: snapshot.val() })
                    console.log('accountType obtained from database: ' + this.state.accountType);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);

            });
            
            setTimeout(this.onLogin, 250);
        }
    }

    onLogin() {
        // Error cases and checking if user account exists
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {this.navigateToHome();})
        .catch((error) => {this.navigateToHome();});
    }

    navigateToHome() {
        console.log('hi');
        if(this.state.accountType === 1) {
            this.props.navigation.navigate('Home', {email: this.state.email, firstName: this.state.firstName, fromScreen: 'SignIn'});
        } else if (this.state.accountType === 2) {
            this.props.navigation.navigate('HomeAdmin', {email: this.state.email, firstName: this.state.firstName});
        }
    }
    
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Whelter</Text>

                {/* Username input box */}
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={'Username'}
                    style={styles.input}
                />

                {/* Password input box */}
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                {/* Login button */}
                <Button
                    title={'Login'}
                    style={styles.input}
                    onPress={this.readDatabase.bind(this)}
                />

                {/* Style that effectively adds an empty space */}
                <View
                    style={styles.space}
                />
                
                {/* Register button */}
                <Button
                    title={'Register'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: 200,
        height: 35,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    text: {
        fontSize: 30,
        lineHeight: 75,
        color: 'black',
        fontWeight: 'bold',
    },
    space: {
        width: 20,
        height: 7,
    },
});