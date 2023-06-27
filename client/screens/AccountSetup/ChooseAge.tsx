import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/FontAwesome";
import headerIMG from "../../assets/images/weight_lifting.png";
import { changeAge } from "../../redux-manager/redux-slice/user-slice";
import { Surface, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";

const ChooseAge = (props) => {
	const navigation = useNavigation();

	const { colors } = useAppSelector((state) => state.theme);
	const {} = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const [age, setAge] = useState<number>(0);

	//Get Age after selecting date from time meal-picker
	function getAgeFromDateOfBirth(dateOfBirth) {
		const today = new Date();
		const birthDate = new Date(dateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();

		const monthDifference = today.getMonth() - birthDate.getMonth();
		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	}
	//Get date from time meal-picker
	const [date, setDate] = useState(new Date());

	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleDateChange = (event, date) => {
		if (date !== undefined) {
			setSelectedDate(date);
			setAge(getAgeFromDateOfBirth(date));
		}
	};

	return (
		<View
			style={{ backgroundColor: colors.secondary }}
			className="flex-1 items-center">
			<Image className="mt-10" source={headerIMG} />

			<Surface
				style={{
					borderTopLeftRadius: 60,
					borderTopRightRadius: 60,
					backgroundColor: colors.background,
				}}
				className="flex-1 h-screen w-screen">
				<View className="mx-14 mt-6">
					<Text
						// style={{ color: colors.primary }}
						className="text-2xl font-bold">
						Your age? {age}
					</Text>
					{/* Display Activity Buttons */}
				</View>
				<View className="mt-20"></View>

				<View
					style={{ backgroundColor: colors.primary }}
					className="flexmt-auto h-60">
					<TouchableOpacity
						className="py-2"
						onPress={() => props.setShowDatePicker(false)}>
						<View className="mx-auto">
							<MaterialIcons name="angle-up" size={30} color={"#ffff"} />
						</View>
					</TouchableOpacity>
					<DateTimePicker
						value={date}
						onChange={handleDateChange}
						textColor="#ffff"
						mode="date"
						display="spinner"></DateTimePicker>
				</View>
				<View className="flex-1 self-center justify-end mb-16">
					<Button
						onPress={async () => {
							await dispatch(changeAge(age));
							navigation.navigate("ChooseGender");
						}}
						style={{
							backgroundColor: colors.primary,
							width: 214,
						}}
						mode="contained">
						<Text style={{ fontSize: 18 }} className="font-bold">
							Done
						</Text>
					</Button>
				</View>
			</Surface>
		</View>
	);
};

export default ChooseAge;
