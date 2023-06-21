import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserCircleIcon } from "react-native-heroicons/outline";
import { supabase } from "../../utils/supabase_authentication/supabase";

const ThemeSelector = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  //Initiate user redux states
  const { email, name } = useAppSelector((state) => state.user);
  const { colors } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  //Edit Profile Hooks
  const [showEditProfile, setEditProfile] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Toggle switch push notifications
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const notificationsToggleSwitch = () =>
    setIsPushEnabled((previousState) => !previousState);

  // Toggle switch Dark Mode
  const [isDarkEnabled, setIsDarkEnabled] = useState(false);
  const darkToggleSwitch = () =>
    setIsDarkEnabled((previousState) => !previousState);

  //Sign out of profile
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error updating email:", error.message);
    }
  };

  //Top Nav on Edit Profile Screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Themes",
      headerTintColor: colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          className="ml-5 mt-2"
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Icon name="angle-left" style={{ color: colors.primary }} size={24} />
        </TouchableOpacity>
      ),
    });
  }, [showEditProfile]);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="mx-8 mt-8">
        <View
          style={{ borderColor: colors.secondary }}
          className="flex flex-row border-solid border-b-2 py-6 items-center"
        >
          <Image
            style={{ width: 42, height: 42 }}
            source={require("../../assets/images/ThemeSelector/Pink.png")}
          />
          <Text className="text-lg font-semibold pl-5">Pink</Text>
          <View className="ml-auto flex-row self-center">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPushEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={notificationsToggleSwitch}
              value={isPushEnabled}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        <View
          style={{ borderColor: colors.secondary }}
          className="flex flex-row border-solid border-b-2 py-6 items-center"
        >
          <Image
            style={{ width: 42, height: 42 }}
            source={require("../../assets/images/ThemeSelector/Green.png")}
          />
          <Text className="text-lg font-semibold pl-5">Green</Text>
          <View className="ml-auto flex-row self-center">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={darkToggleSwitch}
              value={isDarkEnabled}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>
        <View
          style={{ borderColor: colors.secondary }}
          className="flex flex-row border-solid border-b-2 items-center py-2"
        >
          <Image
            style={{ width: 42, height: 42 }}
            source={require("../../assets/images/ThemeSelector/Blue.png")}
          />
          <Text className="text-lg font-semibold pl-5">Blue</Text>
          <View className="ml-auto flex-row self-center">
            <Image
              style={{
                width: 60,
                height: 80,
                transform: [{ scaleX: 0.4 }, { scaleY: 0.4 }],
              }}
              source={require("../../assets/images/ThemeSelector/Lock.png")}
            />
          </View>
        </View>

        <View
          style={{ borderColor: colors.secondary }}
          className="flex flex-row border-solid border-b-2  items-center"
        >
          <Image
            style={{ width: 42, height: 42 }}
            source={require("../../assets/images/ThemeSelector/Lemonade.png")}
          />
          <Text className="text-lg font-semibold pl-5">Lemonade</Text>
          <View className="ml-auto flex-row self-center">
            <Image
              style={{
                width: 100,
                height: 100,
                transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
              }}
              source={require("../../assets/images/ThemeSelector/Premium.png")}
            />
          </View>
        </View>

        <View
          style={{ borderColor: colors.secondary }}
          className="flex flex-row border-solid border-b-2 items-center"
        >
          <Image
            style={{ width: 42, height: 42 }}
            source={require("../../assets/images/ThemeSelector/Pink.png")}
          />
          <Text className="text-lg font-semibold pl-5">Bubble Gum</Text>
          <View className="ml-auto flex-row self-center">
            <Image
              style={{
                width: 100,
                height: 100,
                transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
              }}
              source={require("../../assets/images/ThemeSelector/Premium.png")}
            />
          </View>
        </View>
        <View
          style={{ borderColor: colors.secondary }}
          className="flex flex-row border-solid border-b-2 items-center"
        >
          <Image
            style={{ width: 42, height: 42 }}
            source={require("../../assets/images/ThemeSelector/Pink.png")}
          />
          <Text className="text-lg font-semibold pl-5">SunFlower</Text>
          <View className="ml-auto flex-row self-center">
            <Image
              style={{
                width: 100,
                height: 100,
                transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
              }}
              source={require("../../assets/images/ThemeSelector/Premium.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ThemeSelector;
