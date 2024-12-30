import React from "react";
import { TextInput,  Button, View, TouchableOpacity} from "react-native";

export default function login() {
    <View>
        <TextInput placeholder="Email address"></TextInput>
        <TextInput placeholder="Password"></TextInput>
        <Button title="Login"/>
        <TouchableOpacity><Text style={{color: 'blue', textDecorationLine: 'underline', fontWeight: 'bold',}}>Don't Have Account Already?</Text></TouchableOpacity>
    </View>
}