import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
	FlatList,
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet,
} from "react-native";
import { collectionTracks } from "../../../../../../utils/playlists/collection-sounds";

const CollectionList = () => {
	const navigation = useNavigation();

	const DATA = [
		{
			id: "1",
			title: collectionTracks[0].title,
			img: collectionTracks[0].artwork,
		},
		{
			id: "2",
			title: collectionTracks[1].title,
			img: collectionTracks[1].artwork,
		},
	];

	type ItemProps = { title: string; id: string; img: any };
	const Item = ({ title, id, img }: ItemProps) => (
		<TouchableOpacity
			onPress={async () => {
				navigation.navigate("MeditationTimer", {
					track: collectionTracks,
					track_id: id - 1,
				});
			}}>
			<View
				className="mr-4 rounded"
				style={{
					height: 150,
					width: 150,
				}}>
				<Image source={img} style={styles.backgroundImage} />
			</View>
			<Text className="mt-2 ml-1 text-white">{title}</Text>
		</TouchableOpacity>
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
				renderItem={({ item }) => (
					<Item title={item.title} id={item.id} img={item.img} />
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default CollectionList;

const styles = StyleSheet.create({
	backgroundImage: {
		...StyleSheet.absoluteFillObject,
		resizeMode: "cover",
	},
});
