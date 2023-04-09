import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, StatusBar, SafeAreaView, ScrollView, Alert, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database'

export default class SheltersAdminCreation extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: 0,
            email: '',
            isEmail: false,
            phone: null,
            open: false,
            value: '',
            items: [{label: 'This is a shelter designated for the general population.', value: 'GP'}, {label: 'This is a shelter designated for people and pets.', value: 'PPS'}, {label: 'This is a shelter designated for special needs.', value: 'SpNS'}],
            name: '',
            description: '',
            capacity: null,
            type: '',
            latitude: null,
            longitude: null,
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
        const dbRef = ref(db);
        
        const {email, description, capacity, latitude, longitude, name, type, phone} = this.state;

        if (name === '' || email === '' || description === '' || type === '' || capacity === null || latitude === null || longitude === null || phone === null) {
            Alert.alert('Error: An entry is empty.', `Please fill in all required entries.`);
        }  else if (!regEmail.test(email)) {
            Alert.alert('Error: Email is incorrect', `Please input a valid email address.`);
        } else {
            get(child(dbRef, `Shelters`)).then((snapshot) => {
                var counter = 0;
                snapshot.forEach((snapshot) => {
                    this.setState({id: this.state.id + 1})
                    //console.log('COUNTER in loop  ' + counter);
                    
                });
                this.setState({id: this.state.id});
                console.log('COUNTER in get  ' + counter);
                console.log('ID in get  ' + this.state.id);
                //this.setState({id: counter});
                //console.log('ID in get  ' + this.state.id);
            });
            //console.log('COUNTER  ' + counter);
            //console.log('ID   ' + );

            set(ref(db, 'Shelters/' + this.state.id + '/'), {
                description: description,
                email: email,
                id: this.state.id,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                name: name,
                phone: parseFloat(phone),
                type: type,
            });
            Alert.alert('Shelter has been registered.', `Please press the refresh button to reload the shelter list.`);
            this.props.navigation.navigate('SheltersAdmin');
        }
    }
    
    render() {
        const { open, value, items } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.headerText}>Register a Shelter</Text>
                    
                    <Text style={styles.descText}>Shelter Identifiers</Text>
                    {/* Shelter name input box */}
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'Shelter Name'}
                        style={styles.input}
                    />
                    {/* Shelter type dropdown selector */}
                    <DropDownPicker
                        style={styles.input}
                        placeholder='Type of Shelter'
                        open={open}
                        value={value}
                        items={items}
                        setOpen={this.setOpen.bind(this)}
                        setValue={this.setValue.bind(this)}
                        onChangeValue={(type) => this.setState({ type })}
                        setItems={this.setItems.bind(this)}
                        dropDownDirection="AUTO"
                        bottomOffset={100}
                        listMode='MODAL'
                        modalAnimationType="slide"
                    />

                    <Text style={styles.descText}>Shelter Coordinates</Text>
                    {/* Latitude input box */}
                    <TextInput
                        value={this.state.latitude}
                        onChangeText={(latitude) => this.setState({ latitude })}
                        placeholder={'Latitude (Copied from Google Maps)'}
                        style={styles.input}
                        inputMode='decimal'
                    />
                    {/* Longitude input box */}
                    <TextInput
                        value={this.state.longitude}
                        onChangeText={(longitude) => this.setState({ longitude })}
                        placeholder={'Longitude (Copied from Google Maps)'}
                        style={styles.input}
                        inputMode='decimal'
                    />

                    <Text style={styles.descText}>Additional Information</Text>
                    
                    {/* Shelter email input box */}
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder={'Shelter Email'}
                        style={styles.input}
                    />
                    {/* Phone input box */}
                    <TextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        placeholder={'Shelter Phone Number (XXX-XXX-XXXX)'}
                        style={styles.input}
                        inputMode='tel'
                    />
                    {/* Shelter description input box */}
                    <TextInput
                        value={this.state.description}
                        onChangeText={(description) => this.setState({ description })}
                        placeholder={'Shelter Description'}
                        style={styles.input}
                    />
                    {/* Shelter capacity input box */}
                    <TextInput
                        value={this.state.capacity}
                        onChangeText={(capacity) => this.setState({ capacity })}
                        placeholder={'Shelter Capacity'}
                        style={styles.input}
                        inputMode='decimal'
                    />

                    <View
                        style={styles.space}
                    />
                    <View
                        style={styles.space}
                    />
                    
                    {/* Confirm registration button */}
                    <Button
                        title={'Confirm Registration'}
                        style={styles.input}
                        onPress={this.onRegister.bind(this)}
                    />

                    <View
                        style={styles.space}
                    />

                    {/* Go back to shelters menu button */}
                    <Button
                        title={'Go Back'}
                        style={styles.input}
                        onPress={() => this.props.navigation.navigate('SheltersAdmin')}
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