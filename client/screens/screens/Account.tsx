import { useState, useEffect } from "react";
import { supabase } from "../../features/supabase_authentication/supabase";
import { StyleSheet, View, Alert, Text, Modal, Pressable } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	changeActivity,
	changeAge,
	changeGoal,
	changeHeight,
	changeName,
	changeWeight,
} from "../../features/user/user-slice";
import { setSession } from "../../features/user/session-slice";
import { useNavigation } from "@react-navigation/native";

export default function Account({ session }: { session: Session }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	//profile states
	const [username, setUsername] = useState("");
	const [age, setAge] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [activity, setActivity] = useState("");
	const [goal, setGoal] = useState("");

	//redux toolkit
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//update component and global states
	function updateGlobalProfileStates(data) {
		setUsername(data.username);
		setAge(data.age);
		setHeight(data.height);
		setWeight(data.weight);
		setActivity(data.activity);
		setGoal(data.goal);
		dispatch(changeName(data.username));
		dispatch(changeAge(data.age));
		dispatch(changeHeight(data.height));
		dispatch(changeWeight(data.weight));
		dispatch(changeActivity(data.activity));
		dispatch(changeGoal(data.goal));
	}

	useEffect(() => {
		setModalVisible(true);
		if (session) {
			getProfile();
			dispatch(setSession(session));
		}
	}, [session]);

	const navigateToTabNavigator = () => {
		navigation.navigate("TabNavigator");
	};

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`*`)
				.eq("id", session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				updateGlobalProfileStates(data);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		username,
		age,
		height,
		weight,
		activity,
		goal,
	}: {
		username: string;
		age: string;
		height: string;
		weight: string;
		activity: string;
		goal: string;
	}) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const updates = {
				id: session?.user.id,
				username,
				age,
				height,
				weight,
				activity,
				goal,
				updated_at: new Date(),
			};

			let { error } = await supabase.from("profiles").upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>
							Fill out your profile to get started!
						</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<View style={styles.verticallySpaced}>
				<Input
					label="Username"
					value={username || ""}
					onChangeText={(text) => setUsername(text)}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Age"
					value={age || ""}
					onChangeText={(text) => setAge(text)}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Height"
					value={height || ""}
					onChangeText={(text) => setHeight(text)}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Weight"
					value={weight || ""}
					onChangeText={(text) => setWeight(text)}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Acivity Level 0-10"
					value={activity || ""}
					onChangeText={(text) => setActivity(text)}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Goal Weight"
					value={goal || ""}
					onChangeText={(text) => setGoal(text)}
				/>
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title={loading ? "Loading ..." : "Create Profile"}
					onPress={() => {
						navigateToTabNavigator();
						updateProfile({ username, age, height, weight, activity, goal });
					}}
					disabled={loading}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
