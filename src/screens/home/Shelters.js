import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl, Button, StatusBar} from 'react-native';
import { db } from '../../../FirebaseConfig';
import { ref, child, get } from 'firebase/database'
import { Card } from '@rneui/themed';

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
        return this.state.shelters.map((shelter) =>
            <Card key={shelter.id}>
                <Card.Title>{shelter.name}</Card.Title>
                <Card.Divider />
                <Text>Shelter Type: {shelter.type}</Text>
                <Text>Shelter Capacity: {shelter.capacity}</Text>
                <View style={styles.space} />
                <Button 
                    title="More info"
                    onPress={() => this.props.navigation.navigate('SheltersInfo', {id: shelter.id, fromScreen:'SheltersHome'})}
                />
            </Card>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.setState({shelters: []}); this.readShelterData();}}
                        />
                    }
                >
                    <View style={styles.space} />
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
    space: {
        width: 20,
        height: 10,
    },
});