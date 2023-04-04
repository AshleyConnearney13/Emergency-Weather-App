import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';

const supportedURL = 'https://forecast.weather.gov/MapClick.php?CityName=Volusia&state=FL&site=MLB&textField1=29.1683&textField2=-81.5211&e=0#.ZCssIcLMIYg';

/*type OpenURLButtonProps = {
  url: string;
  //children: string;
};*/
/*

const OpenURLButton = ({url, children}/*: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

    if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button title={children} onPress={handlePress} />;
}



const App = () => {
    return (
      <View style={styles.container}>
        <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
        <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
      </View>
    );
    
}
*/

class Info extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.space}/>
                <Button
                    title={'Current Weather Advisory'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('CurrentWeatherAdvisory')}
                />
                

                <Button
                    title={'Recommended Supplies'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('RecommendedSupplies')}
                />

                <Button
                    title={'Shelter Preparations'}
                    style={styles.input}
                    onPress={() => this.props.navigation.navigate('ShelterPreparations')}
                />
            </SafeAreaView>

            
        );
        
    }
    
}

export default Info;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //alignItems: 'center',
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
});