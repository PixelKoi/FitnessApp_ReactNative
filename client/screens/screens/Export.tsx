import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PaperClipIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import { Button } from 'react-native-paper';

const Export = ({ navigation }) => {
    React.useLayoutEffect(
        () => {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Export')}>
                        <PaperClipIcon name="ios-add" size={20} color="black" style={{ marginRight: 10 }}/>
                    </TouchableOpacity>
                )
            });
        },
        [ navigation ]
    );
    return (
        <View className="flex-1 items-center">
            <Text className="pt-5">Premium Features:</Text>

            <Button className="mt-3 mb-3 py-1 mx-4" mode="contained">
                <Text>Export Fasting Data</Text>
            </Button>
            <Button className="mt-3 mb-3 py-1 mx-4" mode="contained">
                <Text>Export Diary Data</Text>
            </Button>
        </View>
    );
};


export default Export;