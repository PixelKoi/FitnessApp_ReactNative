import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { pureToneTracks } from "../../../../../../constants";

const CollectionList = () => {
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
		<View>
			<View className="flex-row mb-4">
				<Text className="font-bold text-white" style={{ fontSize: 16 }}>
					Collection
				</Text>
				<TouchableOpacity className="ml-auto mt-aut">
					<Text className="text-white font-bold" style={{ fontSize: 14 }}>
						View All
					</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				horizontal={true}
				data={DATA}
				renderItem={({ item }) => <Item title={item.title} id={item.id} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default CollectionList;
