import React, { useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { supabase } from "../../utils/supabase_authentication/supabase";
import { Button, Input } from "react-native-elements";
import { TextInput } from "react-native-paper";
import HeaderIMG from "../../assets/images/weight_lifting.png";

const Auth = () => {
	//hooks
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (!error) {
		} else {
			Alert.alert(error.message);
		}
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Text className="text-2xl font-bold">Sign In</Text>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					leftIcon={{ type: "font-awesome", name: "envelope" }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
				/>
			</View>

			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: "font-awesome", name: "lock" }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title="Sign in"
					disabled={loading}
					onPress={() => signInWithEmail()}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={loading}
					onPress={() => signUpWithEmail()}
				/>
			</View>
		</View>
	);
};

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
});

export default Auth;
