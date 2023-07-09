import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useAppSelector } from "../../../../redux-manager/hooks";
import emoji from "../../../../utils/timer/meditation-dash/emoji-data";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const EmojiDropDown = () => {
	const { username } = useAppSelector((state) => state.user);

	return (
		<View>
			<Text className="font-bold">Hello, {username}</Text>
			<TouchableOpacity
				onPress={() => {}}
				style={{ borderColor: "black", borderWidth: 1 }}
				className="flex w-auto h-12 mt-4 rounded-xl">
				<View className="flex-row my-auto">
					<Image className="ml-2 my-auto w-6 h-6" source={emoji[0].img} />
					<Text className="ml-2 my-auto font-semibold">
						How are you feeling?
					</Text>
					<View className="ml-auto mr-4">
						<Icon name="angle-down" size={30} />
					</View>
				</View>
			</TouchableOpacity>
			<View style={{ borderBottomWidth: 1 }} className="mt-8" />
		</View>
	);
};

export default EmojiDropDown;
