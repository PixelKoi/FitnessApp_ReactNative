import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PaperClipIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";

const Export = ({ navigation }) => {
    React.useLayoutEffect(
        () => {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>BBB</Text>
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
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Export Tab placeholder.</Text>
        </View>
    );
};


export default Export;