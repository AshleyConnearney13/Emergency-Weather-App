import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button} from 'react-native';
import { auth } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
        };
    }

    

    onLogin() {
        const { email, password } = this.state;
        // Add if statement that checks if login is in database.
        if( email === '' || password === '') {
            Alert.alert('Error: Field is left blank', `Please fill in all text fields.`);
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {this.props.navigation.navigate('Home', {email: email});})
            .catch((error) => {Alert.alert('Error: Account does not exist.', `Please verify you are using the correct account credentials.`)});
        }
    }
    
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Whelter</Text>

                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Email'}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <Button
                    title={'Login'}
                    style={styles.input}
                    onPress={this.onLogin.bind(this)}
                />

                <View
                    style={styles.space}
                />

                <Button
                    title={'Register'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}

export default Login;

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