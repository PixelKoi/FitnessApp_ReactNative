import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
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
		{
			id: "4",
			title: "Beta Wave",
		},
		{
			id: "5",
			title: "Gamma Wave",
		},
	];

	type ItemProps = { title: string; id: string };

	const Item = ({ title, id }: ItemProps) => (
		<View>
			<TouchableOpacity
				onPress={async () => {
					navigation.navigate("MeditationTimer", {
						track: pureToneTracks[Number(id - 1)],
					});
				}}
				style={{ backgroundColor: "#E6E6E6", height: 150, width: 160 }}
				className="mr-4 rounded"></TouchableOpacity>
			<Text className="mt-2 ml-1 text-white">{title}</Text>
		</View>
	);
	return (
		<View className="mt-5">
			<Text className="mb-2 font-bold text-white" style={{ fontSize: 18 }}>
				Binaural Pure Tones
			</Text>
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
