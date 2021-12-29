import React, { useState} from 'react'
import {  KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import loginStyles from '../styles/loginStyles'
import auth from '@react-native-firebase/auth' 

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handlesignup = () => 
    {
        auth()
        .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    }
    
    return (
        <KeyboardAvoidingView
            style={loginStyles.container}
            behavior="padding"
        >
            <View style={loginStyles.inputContainer}>
                <TextInput
                    style={loginStyles.input}
                    placeholder="Email"
                    onChangeText = {text => setEmail(text)}
                    value = {email}
                />
                <TextInput
                    style={loginStyles.input}
                    placeholder="Password"
                    onChangeText = {text => setPassword(text)}
                    value = {password}
                    secureTextEntry
                />
            </View>

            <View style={loginStyles.buttonContainer}
            >
                <TouchableOpacity
                    style={[loginStyles.button, loginStyles.buttonOutline]}
                    onPress = {() => { }} 
                >
                    <Text style={loginStyles.buttonText}> Log In </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[loginStyles.button, loginStyles.buttonOutline]}
                    onPress = {handlesignup} 
                >
                    <Text style={loginStyles.buttonText}> Register </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
