import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    UserIcon,
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'

const LogFood = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Food Quick Log',
            headerLeft: () => null, // this will hide the back button
            headerRight: () => (
                <TouchableOpacity onPress={() => console.log('Header profile button pressed')}>
                    <UserIcon name="ios-add" size={30} color="black" style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
            <MagnifyingGlassIcon size={20} color="#00CCBB" />
            <TextInput
                style={{ flex: 1, backgroundColor: 'white', color: 'black' }}
                label="Search Food"
            />
        </View>
    );
};

export default LogFood;
