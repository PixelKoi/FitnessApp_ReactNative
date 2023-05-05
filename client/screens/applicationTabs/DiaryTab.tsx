import React from 'react';
import { View, Text } from 'react-native';

const DiaryTab = (props) => {
	console.log("passing food data to FOODDIARY:",props.route);
	return (
		<View className="flex-1 justify-center items-center">
			<Text className="text-lg">This is my diary.</Text>
		</View>
	);
};

export default DiaryTab;
