import React, { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
//Screen imports
import Account from "../../screens/account/Account";
import FoodLog from "../../screens/diary/FoodLog";
import ProfileScreen from "../../screens/profile/Profile";
import Diary from "../../screens/diary/Diary";
import Dashboard from "../../screens/dashboard/Dashboard";
import Timer from "../../screens/timer/Timer";
//nav imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Supabse imports
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase_authentication/supabase";
//redux imports
import {
  BookOpenIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useAppDispatch } from "../../redux-manager/hooks";
import {
  setSessionID,
  setUserStates,
} from "../../redux-manager/redux-slice/user-slice";
import Profile from "../../database/models/Profile";

const Navigation = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(false);
  const dispatch = useAppDispatch();

  const Stack = createNativeStackNavigator();
  const MainStack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  //Update redux states for profile
  async function updateReduxUserStates(data) {
    await dispatch(
      setUserStates({
        name: data.username,
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        activity: data.activity,
        goal: data.goal,
      })
    );
  }

  //Get redux-slice data from supabase and update redux
  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No redux-slice on the session!");

      let { data, error, status } = await supabase
        .from("profile")
        .select(`*`)
        .eq("user_id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        updateReduxUserStates(data);
        dispatch(setSessionID(data.user_id));
        setUserData(data.created);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  //Home Navigation
  const HomeStack = ({ session }: { session: Session }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => <Account {...props} session={session} />}
        </Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="NavGroup"
          component={NavGroup}
        />
      </Stack.Navigator>
    );
  };

  //Tab Navigation
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="FoodLog"
        screenOptions={{
          tabBarActiveTintColor: "#E07594",
          tabBarInactiveTintColor: "#E0759480",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopColor: "transparent",
            paddingHorizontal: 0,
          },
        }}
      >
        <Tab.Screen
          name="History"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <SquaresPlusIcon name="ios-add" size={24} color={color} />
            ),
            tabBarLabel: "", // Set tabBarLabel to an empty string
          }}
        />
        <Tab.Screen
          name="QuickLog"
          component={FoodLog}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MagnifyingGlassIcon name="ios-add" size={24} color={color} />
            ),
            tabBarLabel: "", // Set tabBarLabel to an empty string
          }}
        />
        <Tab.Screen
          name="Diary"
          component={Diary}
          options={{
            tabBarIcon: ({ color, size }) => (
              <BookOpenIcon name="ios-add" size={24} color={color} />
            ),
            tabBarLabel: "", // Set tabBarLabel to an empty string
          }}
        />
        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ClockIcon name="ios-add" size={24} color={color} />
            ),
            tabBarLabel: "", // Set tabBarLabel to an empty string
          }}
        />
      </Tab.Navigator>
    );
  };

  const NavGroup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreen"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {loading === true ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : loading === false && userData === false ? (
        <HomeStack session={session} />
      ) : (
        <NavGroup />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Change this to "space-evenly" for equal spacing
    padding: 10,
  },
});
