import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuickLogTab from "./QuickLogTab";
import DiaryTab from "./DiaryTab";
import ExportTab from "./ExportTab";
import NutritionTab from "./NutritionTab";
const Tab = createBottomTabNavigator();

function ApplicationNavigator() {
    return (
        <Tab.Navigator initialRouteName="QuickLogTab">
            <Tab.Screen name="QuickLogTab" component={QuickLogTab} />
            <Tab.Screen name="DiaryTab" component={DiaryTab} />
            <Tab.Screen name="NutritionTab" component={NutritionTab} />
            <Tab.Screen name="ExportTab" component={ExportTab} />
        </Tab.Navigator>
    );
}

export default ApplicationNavigator;
