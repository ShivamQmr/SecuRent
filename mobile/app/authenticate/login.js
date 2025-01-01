//authenticate/login.js
import React, { useState } from "react";
import { TextInput,  Button, View, TouchableOpacity} from "react-native";
import API from "../api"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginRequest = async () => {
        try {
            await API.post("/login", {email, password})
            await AsyncStorage.setItem('token', JSON.stringify(request.data))
            Alert.alert("Login Successfull")
        } catch (error) {
            console.log(error)
            Alert.alert("Login failed!", "Please Check Your Credentials")
        }
    }
    return(
    <View>
        <TextInput placeholder="Email address" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}></TextInput>
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}></TextInput>
        <Button title="Login" onPress={loginRequest}/>
        <TouchableOpacity><Text style={{color: 'blue', textDecorationLine: 'underline', fontWeight: 'bold',}}>Don't Have Account Already?</Text></TouchableOpacity>
    </View>
    )
}