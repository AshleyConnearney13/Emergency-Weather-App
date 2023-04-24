import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, Button} from 'react-native';
import { FlatList } from 'react-native';

export default class ShelterPreparations extends Component {
    render() {
        return (  
            <SafeAreaView style={styles.container}>
                <View style={styles.textBackground}>
                    <Text style={styles.header}>Before heading to a shelter, confirm that you have done the following:</Text>
                    <FlatList
                        data={[    
                            {key: 'Check your evacuation zone on the map (Orange = Zone A, Green = Zone BC, Pink = Zone DE).'},
                            {key: 'Ensure there is a shelter that can accomodate your whole party.'},
                            {key: 'Reserve a spot at a shelter using the app\'s reservation system.'},
                            {key: 'Contact the shelter to confirm your reservation is in place.'}, 
                            {key: 'Let emergency contacts know where you are staying.'},
                        ]}
                        renderItem={({item}) => <Text style={styles.body}>{'\n\u2022' + ' '}{item.key}</Text>}
                    />
                </View>
                <View style={styles.space} />
                <Button
                    title={'Go Back'}
                    onPress={() => this.props.navigation.navigate('InfoHome')}
                />
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
        lineHeight: 20,
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