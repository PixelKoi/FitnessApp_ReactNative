import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Surface } from "react-native-paper";

const ActivityBoard = () => {
	return (
		<View>
			<Text className="text-lg font-bold mt-4">Activity</Text>
			<View className="flex-row flex-wrap justify-between mt-4">
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2 rounded-xl mb-2 bg-white">
					<TouchableOpacity style={{ height: 112, width: "100%" }}>
						<Text className="p-2 ml-1 text-xs font-semibold">Meditation</Text>
					</TouchableOpacity>
				</Surface>
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2  rounded-xl mb-2 bg-white">
					<TouchableOpacity style={{ height: 112, width: "100%" }}>
						<Text className="p-2 ml-1 text-xs font-semibold">Fasting</Text>
					</TouchableOpacity>
				</Surface>
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2 rounded-xl bg-white">
					<View>
						<Text className="p-2 ml-1 text-xs font-semibold">Weight Loss</Text>
					</View>
				</Surface>
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2 rounded-xl bg-white">
					<View>
						<Text className="p-2 ml-1 text-xs font-semibold">Steps</Text>
					</View>
				</Surface>
			</View>
		</View>
	);
};

export default ActivityBoard;
