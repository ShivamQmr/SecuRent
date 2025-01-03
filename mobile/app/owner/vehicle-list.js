import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View, Text, Button } from "react-native";
import API from '../api';

export default function VehicleList() {
    const [name, setName] = useState('');
    const [nameList, setNameList] = useState([]);

    const fetchVehicles = async () => {
        try {
            const response = await API.get('vehicles/');
            setNameList(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const addVehicle = async () => {
        if (!name.trim()) return;
        try {
            await API.post('vehicles/', { name });
            setName('');
            fetchVehicles();
        } catch (error) {
            console.error("Error adding vehicle:", error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <View>
            <TextInput
                placeholder="Enter the vehicle number"
                value={name}
                onChangeText={setName}
            />
            <Button title="Save" onPress={addVehicle} />
            <FlatList
                data={nameList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
}
