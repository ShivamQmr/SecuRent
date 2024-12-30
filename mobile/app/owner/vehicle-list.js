import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View, Text, Button } from "react-native";
import API from '../api'

export default function VechicleList(){
    const [name, setName] = useState('')
    const [nameList, setNameList] = useState([])

    const data = async () => {
        API.get('vehicles/')
        .then(response => setNameList(response.data))
        .catch(error => console.log(error))
    }

    const input = async () => {
        API.post('vehicles/', {name: name})
        .then(response => {
            console.log(response.data)
            setName('')
            data()
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        data()
    }, [])

    return(
        <View>
            <TextInput placeholder="Enter the vehicle number" value={name} onChangeText={setName}/>
            <Button title="Save" onPress={input}></Button>
            <FlatList
                data={nameList}
                renderItem={({item}) => (<Text>{item.name}</Text>)}>
            </FlatList>
        </View>
    )
}