import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Alert, Button, Share, StatusBar} from 'react-native';
import { db } from '../../../../FirebaseConfig';
import { ref, child, get, update } from 'firebase/database'
import { Card, Icon } from '@rneui/themed';


export default class SheltersAdminInfo extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            shelters: [],
            refreshing: false,
        };

        this.readShelterData = this.readShelterData.bind(this);
        this.renderShelterType = this.renderShelterType.bind(this);
        this.shareShelter = this.shareShelter.bind(this);
        this.reserveShelter = this.reserveShelter.bind(this);
        this.readShelterData();
    }

    readShelterData() {
        const dbRef = ref(db);

        get(child(dbRef, `Shelters/` + this.props.route.params.id)).then((snapshot) => {
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
            console.log(this.state.shelters);
        });
    }

    renderShelterType(shelter) {
        let type = '';
        if (shelter.type === 'GP') {
            type = 'General Population'
        }
        return (
            <View>
                <Text style={styles.body}>Shelter type: {type}</Text>
            </View>
        )
    }

    reserveShelter(shelter) {
        const saveUser = this.props.route.params.username
        const onReserve = async () => {
            try {
                console.log(this.props.route.params.username)
                update(ref(db, 'Users/' + this.props.route.params.username + '/'), {
                    viewReservation: shelter.id,
                });
                Alert.alert(`Reservation set!`, 'Note: Any pre-existing reservation has been replaced with this one.')
            } catch (error) {
                Alert.alert(error.message);
            }
        };
        return (
            <View>
                <Button onPress={onReserve} title="Reserve" />
            </View>
        );
    };
    
    shareShelter(shelter) {
        const onShare = async () => {
            try {
                const result = await Share.share({
                    message: 'Look at this shelter I found:\n' + shelter.name + '\nType ' + shelter.type + '\n\nCoordinates:\nLatitude = ' + shelter.coordinates.latitude + ', Longitude = ' + shelter.coordinates.longitude + '\n\nContact at ' + shelter.email + ' or ' + shelter.phone,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        };
        return (
            <View>
                <Button onPress={onShare} title="Share" />
            </View>
        );
    };

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
                    {this.state.shelters.map((shelter, index) => (
                        <View key={index}>
                            <View style={styles.textBackground}>
                                <Text style={styles.header}>{shelter.name}</Text>
                            </View>
                            <View style={styles.space} />
                            <View style={styles.textBackground}>
                                <Text style={styles.header2}>Details</Text>
                                {this.renderShelterType(shelter)}
                                <Text style={styles.body}>Total Capacity: {shelter.capacity}</Text>
                                <Text style={styles.body}>Email: {shelter.email}</Text>
                                <Text style={styles.body}>Phone: {shelter.phone}</Text>
                            </View>
                            <View style={styles.space} />
                            <View style={styles.textBackground}>
                                <Text style={styles.header2}>Description</Text>
                                <Text style={styles.body}>{shelter.description}</Text>
                            </View>
                            <View style={styles.space} />
                            {this.reserveShelter(shelter)}
                            <View style={styles.space} />
                            {this.shareShelter(shelter)}
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
        fontSize: 45,
        lineHeight: 50,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '90%',
    },
    header2: {
        fontSize: 35,
        lineHeight: 50,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '90%',
    },
    body: {
        fontSize: 18,
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