import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { db } from '../../../FirebaseConfig';
import { ref, child, get } from 'firebase/database'
import { Card, Icon } from '@rneui/themed';

export default class Shelters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shelters: [],
            refreshing: false,
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
                    capacity: data[0],
                    description: data[1],
                    email: data[2],
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
            <Card key={shelter.id}>
                <Card.Title>{shelter.name}</Card.Title>
                <Card.Divider />
                <Text>
                    Shelter Type: {shelter.type}
                </Text>
                <Text>
                    Shelter Capacity: {shelter.capacity}
                </Text>
                <Button 
                    title="More info"
                    onPress={() => this.props.navigation.navigate('SheltersInfo', {id: shelter.id, fromScreen:'Shelters'})}
                />
            </Card>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.setState({shelters: []}); this.readShelterData();}}
                        />
                    }
                >
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
    touchable: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10
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