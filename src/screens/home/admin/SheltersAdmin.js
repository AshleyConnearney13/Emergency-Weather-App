import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { db } from '../../../../FirebaseConfig';
import { ref, child, get } from 'firebase/database'
import { Card, Icon } from '@rneui/themed';

export default class SheltersAdmin extends Component {
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

        get(child(dbRef, `Users/${this.props.route.params.username}/viewShelter`)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({ viewShelter: snapshot.val() })
                get(child(dbRef, `Shelters/` + this.state.viewShelter)).then((snapshot) => {
                    let data = [];
                    snapshot.forEach((snapshot) => {
                        data.push(snapshot.val()) 
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
                    });
                    this.setState({shelters: this.state.shelters});
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    createShelterEntries() {
        console.log('Creating shelter entries...');
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
                <View style={styles.space} />
                <Button 
                    title="See reservations"
                    onPress={() => this.props.navigation.navigate('SheltersAdminInfo', {id: shelter.id, fromScreen:'SheltersHome'})}
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
                    <View style={styles.space} />
                    <Button
                        title={'Create a Shelter'}
                        style={styles.input}
                        onPress={() => this.props.navigation.navigate('SheltersAdminCreation')}
                    />
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
    input: {
        width: 380,
        //height: 40,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'baseline',       
    },
    space: {
        width: 20,
        height: 20,
    },
});