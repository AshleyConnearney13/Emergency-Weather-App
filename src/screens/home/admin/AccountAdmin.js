import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar, RefreshControl, ScrollView} from 'react-native';
import { db } from '../../../../FirebaseConfig'
import { ref, get, child } from 'firebase/database'

export default class AccountAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            viewShelter: null,
            shelters: [],
            refreshing: false
        }
        this.readAccountData = this.readAccountData.bind(this);
        this.readAccountData();
    }
    
    readAccountData() {
        const dbRef = ref(db);

        get(child(dbRef, `Users/${this.props.route.params.username}/firstName`)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({ firstName: snapshot.val() })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.setState({firstName: ''}); this.setState({shelters: []}); this.readAccountData();}}
                        />
                    }
                >
                    <View style={styles.space}/>
                    <View style={styles.textBackground}>
                        <Text style={styles.header}>Welcome, {this.state.firstName}.</Text>
                    </View>

                    <View style={styles.space}/>
                    <View style={styles.textBackground}>
                        <Text style={styles.header}>You are part of shelter management.</Text>
                    </View>

                    <View style={styles.space}/>
                    {this.state.shelters.map((shelter, index) => (
                        <View key={index}>
                            <View style={styles.textBackground}>
                                <Text style={styles.header}>Assigned Shelter:</Text>
                                <Text style={styles.body}>{shelter.name}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'stretch',
        paddingTop: StatusBar.currentHeight,
    },
    textBackground: {
        borderRadius: 20,
        width: '90%',
        padding: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.1)'
    },
    header: {
        fontSize: 35,
        lineHeight: 50,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
    },
    body: {
        fontSize: 18,
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