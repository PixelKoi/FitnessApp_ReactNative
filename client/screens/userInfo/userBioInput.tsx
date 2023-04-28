import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const UserBioInput = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goal, setGoal] = useState('');

    return (
        <View>
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
