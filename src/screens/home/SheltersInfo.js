import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl, Alert, Button, Share, StatusBar} from 'react-native';
import { db } from '../../../FirebaseConfig';
import { ref, child, get, update } from 'firebase/database'


export default class SheltersInfo extends Component {
    
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
        if (shelter.type === 'PPS') {
            type = 'People and Pets'
        }
        if (shelter.type === 'SpNS') {
            type = 'Special Needs'
        }
        return (
            <View>
                <Text style={styles.body}>Shelter type: {type}</Text>
            </View>
        )
    }

    reserveShelter(shelter) {
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.setState({shelters: []}); this.readShelterData();}}
                        />
                    }
                >
                    <View style={styles.space}/>
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
                    <View style={styles.space} />
                    <Button
                        onPress={() => this.props.navigation.navigate('SheltersHome')}
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
    scrollView: {
        marginLeft: 10,
        marginRight: 10,
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