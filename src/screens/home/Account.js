import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar, RefreshControl, ScrollView} from 'react-native';
import { db } from '../../../FirebaseConfig'
import { ref, get, child } from 'firebase/database'

export default class Account extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: '',
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
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.setState({firstName: ''}); this.readAccountData();}}
                        />
                    }
                >
                    <View style={styles.space}/>
                    
                    <View style={styles.textBackground}>
                        <Text style={styles.header}>Welcome, {this.state.firstName}.</Text>
                    </View>

                    <View style={styles.space}/>

                    <View style={styles.textBackground}>
                        <Text style={styles.header}>You are in Zone A.</Text>
                    </View>

                    <View style={styles.space}/>

                    <View style={styles.textBackground}>
                        <Text style={styles.header}>Shelters near you:</Text>
                        <Text style={styles.body}>Example 1: 123 Test Lane...   (3.8 mi)</Text>
                        <Text style={styles.body}>Example 2: 456 Test Place...  (6.7 mi)</Text>
                        <Text style={styles.body}>Example 3: 7890 Test Ave...   (12.4 mi)</Text>
                    </View>
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