import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { db } from '../../../FirebaseConfig';
import { ref, child, get } from 'firebase/database'
import { Card, Icon } from '@rneui/themed';

export default class Shelters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shelters: [],
        };

        this.createShelterEntries = this.createShelterEntries.bind(this);
        this.readShelterData = this.readShelterData.bind(this);
        this.readShelterData();
    }
    
    readShelterData() {
        const dbRef = ref(db);

        get(child(dbRef, `Shelters`)).then((snapshot) => {
            snapshot.forEach((snapshot) => {
                let data = [];
                snapshot.forEach((child) => {
                    data.push(child.val())
                });
                this.state.shelters.push({
                    description: data[0],
                    email: data[1],
                    capacity: data[2],
                    id: data[3],
                    coordinates: {
                        latitude: data[4],
                        longitude: data[5],
                    },
                    name: data[6],
                    phone: data[7],
                    type: data[8],
                })
            });
            this.setState({shelters: this.state.shelters});
            console.log(this.state.shelters);
        });
    }

    createShelterEntries() {
        console.log('i am here');
        return this.state.shelters.map((shelter) =>
            <Card>
                <Card.Title>{shelter.name}</Card.Title>
                <Card.Divider />
                <Text>
                    Shelter Type: {shelter.type}
                </Text>
                <Text>
                    Shelter Capacity: nothing yet
                </Text>
            </Card>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.body}>Placeholder</Text>
                    {this.createShelterEntries()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
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