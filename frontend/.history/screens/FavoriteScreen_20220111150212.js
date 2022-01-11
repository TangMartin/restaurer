import React, { useState, Component, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ShadowPropTypesIOS, Button, FlatList} from 'react-native'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

import { NavigationEvents } from "react-navigation";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




export default function FavoriteScreen () {

    const [data, SetData] = useState()

    userData = async () => {
        const user = auth().currentUser;
        var userRef = firestore().collection('favoritelist').doc(user.uid).collection(user.uid);
        
        const markers = [];
            await firestore()
            .collection('favoritelist')
            .doc(user.uid)
            .collection(user.uid).get()
            .where(fake, '!=', fake)
              .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                markers.push(doc.data());
              });});
              SetData({markers});         
    };

    EmptyListMessage = () => {
        return (
            <View>
                <Text> Nothing Here</Text>
            </View>
        )
    }

    userData()

    return (
        <SafeAreaView>
            <FlatList
                data={data?.markers}
                ListEmptyComponent={EmptyListMessage}
                renderItem={({item, index}) => {
                    return(
                        <Text>
                            {item.locationname}
                        </Text>
                    );
                }
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}