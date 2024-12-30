import React, { useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "expo-router";
import login from "./authenticate";
import VechicleList from "./owner/vehicle-list";

const LoginToken = async (token) => {
    try {
        userToken = await AsyncStorage.getItem(token)
    } catch (e) {
        console.log(e)
    }
}

export default function Home() {
    const navigation = useNavigation()
    
    useEffect(() => {
        LoginToken()
        if (userToken){
            navigation.replace("VehicleList")
        }
        else {
            navigation.replace("login")
        }
    })
}