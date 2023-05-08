import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PaperClipIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";

const Fasting = () => {
    const navigation = useNavigation()
    React.useLayoutEffect(
        () => {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                )
            });
        },
        [ navigation ]
    );
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Fasting Empty Component</Text>
        </View>
    );
};


export default Fasting;