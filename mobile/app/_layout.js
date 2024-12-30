// import { Stack } from "expo-router";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from './authenticate'
import Home from './index'
import VehicleList from './owner/vehicle-list'

const Stack = createNativeStackNavigator()

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName = "Home">
      <Stack.Screen name = "Home" component = {Home}/>
      <Stack.Screen name = "VehicleList" component = {VehicleList}/>
      <Stack.Screen name = "Authenticate" component = {login} options = {{headerShown: false}}/>
    </Stack.Navigator>
  )
}
