import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';

class Map extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MapView
                    style={styles.map}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: 29.02324212834788,
                        longitude: -81.18308546577359,
                        latitudeDelta: 0.5922,
                        longitudeDelta: 0.9421,
                    }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    onUserLocationChange={(e)=>console.log(e.nativeEvent.coordinate)}
                >
                    <Geojson
                        geojson={volusiaCounty}
                        strokeColor="black"
                        strokeWidth={3}
                        fillColor='rgba(52, 52, 52, 0.2)'
                    />
                </MapView>
            </SafeAreaView>
        );
    }
}

export default Map;

const volusiaCounty = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"GEO_ID":"0500000US12127","STATE":"12","COUNTY":"127","NAME":"Volusia","LSAD":"County","CENSUSAREA":1101.032},"geometry":{"type":"Polygon","coordinates":[[[-81.178936,28.781886],[-81.183198,28.797468],[-81.195021,28.792302],[-81.210452,28.802453],[-81.216345,28.808302],[-81.215898,28.814423],[-81.224596,28.822039],[-81.222874,28.826862],[-81.226003,28.83263],[-81.229881,28.832621],[-81.24997,28.833106],[-81.36694,28.879227],[-81.354554,28.984375],[-81.502055,29.097802],[-81.531262,29.176621],[-81.61234,29.202943],[-81.641916,29.276766],[-81.648438,29.290173],[-81.655677,29.29994],[-81.667885,29.301488],[-81.675523,29.310628],[-81.680903,29.32443],[-81.561194,29.351686],[-81.540873,29.356556],[-81.521764,29.362194],[-81.518045,29.361868],[-81.507989,29.364511],[-81.450892,29.378464],[-81.433992,29.398552],[-81.41729,29.261156],[-81.150081,29.265957],[-81.155881,29.410954],[-81.101923,29.427055],[-81.046678,29.307856],[-80.995423,29.206052],[-80.966176,29.14796],[-80.944376,29.110861],[-80.907275,29.064262],[-80.893675,29.036163],[-80.878275,29.010563],[-80.787021,28.875266],[-80.732244,28.791237],[-80.967895,28.790197],[-80.964466,28.612992],[-80.98725,28.612997],[-81.10575,28.828541],[-81.178936,28.781886]]]},"id":"12127"}]}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight+9,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

mapStyle=[{elementType:"geometry",stylers:[{color:"#ebe3cd"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c9b2a6"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#dcd2be"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#a5b076"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#b9d3c2"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}];