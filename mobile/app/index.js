// index.js
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import VehicleList from "./owner/vehicle-list";
import Login from "./authenticate/login";

const Stack = createStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);
    const [initialRouteName, setInitialRouteName] = useState("Login");

    useEffect(() => {
        const checkToken = async () => {
            const userToken = await AsyncStorage.getItem("token");
            if (userToken) {
                const parsedToken = JSON.parse(userToken);
                if (parsedToken && parsedToken.isValid) {
                    setInitialRouteName("Home");
                }
            }
            setLoading(false);
        };

        checkToken();
    }, []);

    if (loading) return <Text>Loading...</Text>;

    return (
        // <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen name="Home" component={VehicleList} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        // </NavigationContainer>
    );
}
