import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl, Button, StatusBar} from 'react-native';
import { db } from '../../../../FirebaseConfig';
import { ref, child, get, update } from 'firebase/database'
import { Card } from '@rneui/themed';


export default class SheltersAdminInfo extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            refreshing: false,
        };

        this.readShelterData = this.readShelterData.bind(this);
        this.createReservationEntries = this.createReservationEntries.bind(this);
        this.readShelterData();
    }

    readShelterData() {
        const dbRef = ref(db);

        get(child(dbRef, `Users`)).then((snapshot) => {
            snapshot.forEach((snapshot) => {
                let data = [];
                snapshot.forEach((child) => {
                    data.push(child.val())
                });
                if((data[0] === 1) && data[8] === this.props.route.params.id) {
                    this.state.users.push({
                        email: data[1],
                        phone: data[6],
                        firstName: data[2],
                        lastName: data[3],
                        middleName: data[4],
                        username: data[7]
                    })
                }
            });
            this.setState({users: this.state.users});
            console.log(this.state.users);
        });
    }

    createReservationEntries() {
        console.log('i am here');
        return this.state.users.map((user) =>
            <Card key={user.phone}>
                <Card.Title>{user.firstName} {user.middleName} {user.lastName}</Card.Title>
                <Card.Divider />
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
                <View style={styles.space} />
                <Button 
                    title="Delete reservation"
                    onPress={() => update(ref(db, 'Users/' + user.username + '/'), {
                        viewReservation: null,
                    })}
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
                            onRefresh={() => {this.setState({users: []}); this.readShelterData();}}
                        />
                    }
                >
                    <View style={styles.space}/>
                    <View style={styles.textBackground}>
                        <Text style={styles.header}>{this.props.route.params.shelterName}</Text>
                    </View>
                    {this.createReservationEntries()}
                    <View style={styles.space}/>
                    <Button
                        onPress={() => this.props.navigation.navigate('SheltersAdmin')}
                        title="Go Back" 
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent:'center'
    },
    textBackground: {
        borderRadius: 20,
        width: '90%',
        padding: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.1)'
    },
    header: {
        fontSize: 45,
        lineHeight: 50,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '90%',
    },
    space: {
        width: 20,
        height: 20,
    },
});