import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { FlatList } from 'react-native';

// We want this page to have recommended supplies written out in list? With listed sources? 
// add notepad for user input 
// look up how to see which shelters are closest to you

class RecommendedSupplies extends Component {
    render() {
        
            return (    
            
            <View style={styles.textBackground}>
            
                <View style={styles.space}/>
                    
                        <FlatList
                        data={[
                         {key: '1. Three day supply of water'},
                         {key: '2. Three day supply of food'},
                         {key: '3. Battery powered radio'},
                         {key: '4. Flashlight'},
                         {key: '5. Additional batteries'},
                         {key: '6. First-aid kit'},
                         {key: '7. Refill needed medications'},
                         {key: '8. Emergency blanket'},
                         {key: '9. Make copies of important documents'},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{'\u2028' + ' '}{item.key}</Text>}
                    ListHeaderComponent={() => {
                        return (<Text style={styles.body} >Hurricane</Text>)
                    }}
                  />

                            <FlatList
                            data={[
                             {key: '1. Three day supply of water'},
                             {key: '2. Three day supply of food'},
                             {key: '3. Battery powered radio'},
                             {key: '4. Flashlight'},
                             {key: '5. Additional batteries'},
                             {key: '6. First-aid kit'},
                             {key: '7. Refill needed medications'},
                             {key: '8. Emergency blanket'},
                             {key: '9. Make copies of important documents'},
                             {key: '10. Waterproof container'},
                             {key: '11. Turn off house utilities'},
                             {key: '12. Flares'},
                        ]}
                         renderItem={({item}) => <Text style={styles.item}>{'\u2028' + ' '}{item.key}</Text>}
                        ListHeaderComponent={() => {
                            return (<Text style={styles.body} >Flooding</Text>)
                         }}
                         />

                                <FlatList
                                data={[
                                {key: '1. Take items at risk of blowing away inside'},
                                {key: '2. Cover up windows'},
                                {key: '3. Trim trees/branches close to your powerlines and home'},
                             ]}
                            renderItem={({item}) => <Text style={styles.item}>{'\u2028' + ' '}{item.key}</Text>}
                            ListHeaderComponent={() => {
                              return (<Text style={styles.body} >High Wind Speeds</Text>)
                             }}
                         />

                </View>
              );
    }
}

export default RecommendedSupplies;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    textBackground: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        paddingTop: '5%',
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
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