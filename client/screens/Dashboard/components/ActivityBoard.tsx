import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Surface } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome5";

import { useAppSelector } from "../../../redux-manager/hooks";

const ActivityBoard = () => {
	const { countdown } = useAppSelector((state) => state.fasting);
	const { weight, goal } = useAppSelector((state) => state.user);
	return (
		<View>
			<Text className="text-lg font-bold mt-2">Activity</Text>
			<View className="flex-row flex-wrap justify-between mt-4">
				{/* Meditation Card */}
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2 rounded-xl mb-3.5 bg-white">
					<TouchableOpacity style={{ height: 112, width: "100%" }}>
						<View className="flex-row">
							<Text className="p-2 ml-1 text-xs font-bold">Meditation</Text>
							<View className="p-2 ml-auto">
								<AntDesign name="plus" size={15} />
							</View>
						</View>
						<View className="flex-row ml-3 mt-3">
							<View className="w-6 h-6">
								<View className="self-center my-auto">
									<AntDesign name="clockcircle" color={"#FFA01C"} size={15} />
								</View>
							</View>
							<Text className="self-center text-sm ml-2">0 hours</Text>
						</View>
					</TouchableOpacity>
				</Surface>
				{/* Fasting Card */}
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2  rounded-xl mb-3 bg-white">
					<TouchableOpacity style={{ height: 100, width: "100%" }}>
						<View className="flex-row">
							<Text className="p-2 ml-1 text-xs font-bold">Fasting</Text>
							<View className="p-2 ml-auto">
								<AntDesign name="plus" size={15} />
							</View>
						</View>
						<View>
							<View className="flex-row ml-3 mt-3">
								<View className="w-6 h-6">
									<View className="self-center my-auto">
										<AntDesign name="clockcircle" color={"#FFA01C"} size={15} />
									</View>
								</View>
								<Text className="self-center text-sm ml-2">{countdown} hr</Text>
							</View>
							<View className="flex-row ml-3 mt-1">
								<View className="w-6 h-6">
									<View className="self-center my-auto">
										<MaterialIcons
											name="local-fire-department"
											color={"#FFA01C"}
											size={20}
										/>
									</View>
								</View>
								<Text className="self-center text-sm ml-2 ">0 days</Text>
							</View>
						</View>
					</TouchableOpacity>
				</Surface>
				{/* Weight Loss */}
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2 rounded-xl bg-white">
					<View className="flex-row">
						<Text className="p-2 ml-1 text-xs font-bold">Current Weight</Text>
						<View className="p-2 ml-auto">
							<AntDesign name="plus" size={15} />
						</View>
					</View>
					<View className="flex-row ml-3">
						<View className="w-6 h-6">
							<View className="self-center my-auto">
								<FontAwesome6 name="dumbbell" size={15} color={"#FFA01C"} />
							</View>
						</View>
						<Text className="ml-2 text-sm self-center">{weight} kg</Text>
					</View>
					<View className="flex-row ml-3 mt-1">
						<Text className="self-center text-xs">Goal: {goal}lb/week</Text>
					</View>
				</Surface>
				{/* Steps Card */}
				<Surface
					style={{ height: 112, width: "48%" }}
					className="w-1/2 rounded-xl bg-white">
					<View className="flex-row">
						<Text className="p-2 ml-1 text-xs font-bold">Steps</Text>
						<View className="p-2 ml-auto">
							<AntDesign name="plus" size={15} />
						</View>
					</View>
					<View className="flex-row ml-2 mt-1">
						<View className="w-6 h-6">
							<View className="self-center my-auto">
								<MaterialCommunityIcons
									name="foot-print"
									color={"#FFA01C"}
									size={20}
								/>
							</View>
						</View>
						<Text className="self-center text-sm ml-2">0</Text>
					</View>
					<View className="flex-row ml-1 mt-1">
						<Text className="self-center text-xs ml-2">Goal: 10,000 steps</Text>
					</View>
				</Surface>
			</View>
		</View>
	);
};

export default ActivityBoard;
