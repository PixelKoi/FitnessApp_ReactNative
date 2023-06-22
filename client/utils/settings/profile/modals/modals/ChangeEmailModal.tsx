import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native";
import { Button, Surface } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../../../supabase_authentication/supabase";
import { Session } from "@supabase/supabase-js";
import headerIMG from "../../../../../assets/images/weight_lifting.svg";

const ChangeEmailModal = (props) => {
  const [session, setSession] = useState<Session | null>(null);

  //Change Email Hooks
  const [newEmail, setNewEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  });

  async function updateEmail(newEmail) {
    try {
      // Update the email using Supabase's `update` method
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) {
        throw error;
      }

      // If the email update is successful, update the email in the user Settings table
      const { data, error: profileError } = await supabase
        .from("profile")
        .update({ email: newEmail })
        .match({ id: session.user.id });

      if (profileError) {
        throw profileError;
      }

      console.log("Email updated successfully");
    } catch (error) {
      console.error("Error updating email:", error.message);
    }
  }

  return (
    <Modal className="bg-secondary" visible={props.visible}>
      <TouchableOpacity
        onPress={() => props.setShowModal(false)}
        className="ml-auto mr-4 p-2 mt-20 bg-primary rounded-full"
      >
        <AntDesign style={{ color: "#ffff" }} name="close" size={20} />
      </TouchableOpacity>
      <View className="flex-1 h-full justify-center  bg-secondary ">
        <Surface className="mx-8 py-20 bg-background rounded-3xl">
          <View className="flex-row mx-8 ">
            <TextInput
              className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
              value={newEmail}
              onChangeText={(newEmail) => setNewEmail(newEmail)}
            ></TextInput>
            <View className="ml-auto flex-row self-center">
              <Text className="text-xs mr-2 text-primary opacity-60">
                New Email
              </Text>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={15}
                color={"#E07594"}
              />
            </View>
          </View>

          <View className="flex-row mx-8 ">
            <TextInput
              className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
              value={repeatEmail}
              onChangeText={(repeatEmail) => setRepeatEmail(repeatEmail)}
            ></TextInput>
            <View className="ml-auto flex-row self-center">
              <Text className="text-xs mr-2 text-primary opacity-60">
                Repeat Email
              </Text>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={15}
                color={"#E07594"}
              />
            </View>
          </View>

          <View className="flex-row mx-8 ">
            <TextInput
              className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
              value={password}
              onChangeText={(password) => setPassword(password)}
            ></TextInput>
            <View className="ml-auto flex-row self-center">
              <Text className="text-xs mr-2 text-primary opacity-60">
                Password
              </Text>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={15}
                color={"#E07594"}
              />
            </View>
          </View>

          <Button
            onPress={() => {
              if (newEmail === repeatEmail) {
                updateEmail(newEmail);
              }
            }}
            className="mt-10 mx-8"
            mode="outlined"
          >
            Send
          </Button>
        </Surface>
      </View>
    </Modal>
  );
};

export default ChangeEmailModal;
