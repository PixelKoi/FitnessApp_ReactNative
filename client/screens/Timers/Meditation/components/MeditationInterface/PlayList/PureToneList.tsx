import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { pureToneTracks } from "../../../../../../constants";

const PureToneList = () => {
	const navigation = useNavigation();

	const DATA = [
		{
			id: "1",
			title: "Delta Wave",
		},
		{
			id: "2",
			title: "Theta Wave",
		},
		{
			id: "3",
			title: "Alpha Wave",
		},
	];

	type ItemProps = { title: string; id: string };

	const Item = ({ title, id }: ItemProps) => (
		<TouchableOpacity
			onPress={async () => {
				navigation.navigate("MeditationTimer", {
					track: pureToneTracks[id - 1],
				});
			}}
			style={{ backgroundColor: "red", height: 150, width: 160 }}
			className="mr-4">
			<Text className="">{title}</Text>
		</TouchableOpacity>
	);
	return (
		<View className="mt-5">
			<FlatList
				horizontal={true}
				data={DATA}
				renderItem={({ item }) => <Item title={item.title} id={item.id} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default PureToneList;
