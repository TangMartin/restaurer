import React, { useState, Component, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ShadowPropTypesIOS,} from 'react-native'
import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

import { NavigationEvents } from "react-navigation";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import globalStyles from '../styles/globalStyles'
import loginStyles from '../styles/loginStyles'
import homeStyles from '../styles/homeStyles'

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import mapStyle from '../components/mapStyle.json'
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'



class HomeScreen extends Component {

      state = {
        regionSet: false,
      }


      userData = async () => {
        const user = auth().currentUser;
        var userRef = firestore().collection('favoritelist').doc(user.uid).collection(user.uid);
        
        const markers = [];
            await firestore().collection('favoritelist').doc(user.uid).collection(user.uid).get()
              .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                markers.push(doc.data());
              });});
              this.setState({markers});
              
              //console.log(this.state.markers)
              //console.log(this.state.markers[0].lat) 
              
        };

      componentDidMount() {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords
          const region = {
            ...this.state.region,
            latitude,
            longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }
          this.setState({ region, regionSet: true })
        })
        this.userData()
      }
      
      onRegionChange = (region) => {
        if (!this.state.regionSet) return;
        this.setState({
          region
        });
      }



    render( ) {

      

       
        
    }
    
}

export default function(props) {
  return (
    <MapView
        key={isFocused}
        style={{flex: 1}} 
        provider={PROVIDER_GOOGLE} 
        customMapStyle={mapStyle}
        zoomEnabled={true}
        showsUserLocation
        followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={this.state.region}
        isFocused={isFocused}
    >
    {this.state.markers?.map((marker, index) => (
      console.log(),
      <Marker
        key={index}
        coordinate={{latitude : marker.lat, longitude : marker.lng}}
        title={marker.locationname}
      />

    ))}
    </MapView>
)
}