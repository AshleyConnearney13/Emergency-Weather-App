import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';

export default class RecommendedSupplies extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.space}/>
                    <View style={styles.textBackground}>
                        <FlatList
                            scrollEnabled={false}
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
                            renderItem={({item}) => <Text style={styles.body}>{'\u2022' + ' '}{item.key}</Text>}
                            ListHeaderComponent={() => {
                                return (<Text style={styles.header}>Hurricane</Text>)
                            }}
                        />
                    </View>
                    <View style={styles.space}/>
                    <View style={styles.textBackground}>
                        <FlatList
                            scrollEnabled={false}
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
                            renderItem={({item}) => <Text style={styles.body}>{'\u2022' + ' '}{item.key}</Text>}
                            ListHeaderComponent={() => {
                                return (<Text style={styles.header} >Flooding</Text>)
                            }}
                        />
                    </View>
                    <View style={styles.space}/>
                    <View style={styles.textBackground}>
                        <FlatList
                            scrollEnabled={false}
                            data={[
                                {key: '1. Take items at risk of blowing away inside'},
                                {key: '2. Cover up windows'},
                                {key: '3. Trim trees/branches close to your powerlines and home'},
                            ]}
                            renderItem={({item}) => <Text style={styles.body}>{'\u2022' + ' '}{item.key}</Text>}
                            ListHeaderComponent={() => {
                                return (<Text style={styles.header} >High Wind Speeds</Text>)
                            }}
                        />
                    </View>
                    <View style={styles.space}/>
                    <Button
                        title={'Go Back'}
                        onPress={() => this.props.navigation.navigate('InfoHome')}
                    />
                    <View style={styles.space}/>
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
        alignSelf: 'center',
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
        fontSize: 15,
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