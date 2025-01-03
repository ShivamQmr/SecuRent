import React, { useState } from "react";
import { TextInput, Button, View, TouchableOpacity, Text, Alert } from "react-native";
import API from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginRequest = async () => {
        try {
            const response = await API.post("/login", { email, password });
            await AsyncStorage.setItem('token', JSON.stringify(response.data));
            Alert.alert("Login Successful");
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Login failed!", "Please check your credentials.");
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email address"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={loginRequest} />
            <TouchableOpacity>
                <Text style={{ color: 'blue', textDecorationLine: 'underline', fontWeight: 'bold' }}>
                    Don't Have an Account Already?
                </Text>
            </TouchableOpacity>
        </View>
    );
}
