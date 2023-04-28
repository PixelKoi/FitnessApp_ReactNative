import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserBioInput = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goal, setGoal] = useState('');
    const navigation = useNavigation();
// TODO: Fix navigation back button not showing on userBioInput page.
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Name:</Text>
            <TextInput value={name} onChangeText={setName} />

            <Text>Age:</Text>
            <TextInput keyboardType='numeric' value={age} onChangeText={setAge} />

            <Text>Gender:</Text>
            <TextInput value={gender} onChangeText={setGender} />

            <Text>Height (cm):</Text>
            <TextInput keyboardType='numeric' value={height} onChangeText={setHeight} />

            <Text>Weight (kg):</Text>
            <TextInput keyboardType='numeric' value={weight} onChangeText={setWeight} />

            <Text>Activity level (1-10):</Text>
            <TextInput keyboardType='numeric' value={activityLevel} onChangeText={setActivityLevel} />

            <Text>Goal (1-10):</Text>
            <TextInput keyboardType='numeric' value={goal} onChangeText={setGoal} />
        </View>
    );
};

export default UserBioInput;
