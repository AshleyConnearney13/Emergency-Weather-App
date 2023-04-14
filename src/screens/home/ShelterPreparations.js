import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { FlatList } from 'react-native';

// of things to do prior to signing up for a shelter + things to bring to a shelter + etc. 
// button to bring shelter screen and add home navigation // copy from log in file register button and .prompts. navation

class Shelters extends Component {
    render() {
        return (    
            
            <View style={styles.textBackground}>
                <View style={styles.space} />
            <SafeAreaView style={styles.container}>
                <View style={styles.space}/>

                 <Text style={styles.body}>Before arriving at a shelter please go through
                 the following checklist:</Text>
                    </SafeAreaView>
                        <FlatList
                        data={[
                         {key: 'Sign up for a shelter near you'},
                         {key: 'Recieved confirmation from shelter'},
                         {key: 'Check if the shelter accepts pets if necessary'},
                         {key: 'Contact emergency contacts and notify them of your location'},
  
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{'\u2022' + ' '}{item.key}</Text>}
                  />

                </View>
              );
    }
}

export default Shelters;

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
    space: {
        width: 20,
        height: 20,
    },
    item: {
        fontSize: 15,
    },
});