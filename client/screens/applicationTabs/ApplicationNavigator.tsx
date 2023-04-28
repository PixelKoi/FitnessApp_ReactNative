import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuickLogTab from "./QuickLogTab";
import DiaryTab from "./DiaryTab";
import ExportTab from "./ExportTab";
import NutritionTab from "./NutritionTab";
const Tab = createBottomTabNavigator();
import {
    FireIcon,
    MagnifyingGlassIcon,
    BookOpenIcon,
    PaperClipIcon
} from 'react-native-heroicons/outline'
function ApplicationNavigator() {
    return (

        <Tab.Navigator initialRouteName="QuickLogTab">
            <Tab.Screen name="QuickLogTab" component={QuickLogTab}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MagnifyingGlassIcon name="ios-add" size={20} color="black"  />
                            ),
                        }}/>
            <Tab.Screen name="DiaryTab" component={DiaryTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <BookOpenIcon name="ios-add" size={20} color="black" />
                ),
            }}/>
            <Tab.Screen name="NutritionTab" component={NutritionTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <FireIcon name="ios-add" size={20} color="black" />
                ),
            }}/>
            <Tab.Screen name="ExportTab" component={ExportTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <PaperClipIcon name="ios-add" size={20} color="black" />
                ),
            }}/>
        </Tab.Navigator>
    );
}

export default ApplicationNavigator;
