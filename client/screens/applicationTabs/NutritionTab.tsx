import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckCircleIcon} from "react-native-heroicons/outline";
import {
    UserIcon,
} from 'react-native-heroicons/outline'
import userBioInput from "../userInfo/userBioInput";
const NutritionTab = ({navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null, // this will hide the back button
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('UserBioInput')} mode="contained">
                    <UserIcon name="ios-add" size={30} color="black" style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Nutrition Tab placeholder.</Text>
        </View>
    );
};


export default NutritionTab;