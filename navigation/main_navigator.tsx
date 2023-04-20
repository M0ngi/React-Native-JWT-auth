import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home_screen";
import BottomTabNav from "../components/bottom_tab_nav";
import SettingScreen from "../screens/setting_screen";
import EditPassScreen from "../screens/editpass_screen";
import EditInfoScreen from "../screens/editinfo_screen";

const mainStack = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <mainStack.Navigator 
      initialRouteName="HomeScreen" 
      tabBar={props => <BottomTabNav {...props} />}
      >
        <mainStack.Screen 
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <mainStack.Screen 
          name="SettingScreen"
          component={SettingScreen}
          options={{headerShown: false}}
        />
        <mainStack.Screen 
          name="EditPassScreen"
          component={EditPassScreen}
          options={{headerShown: false}}
        />
        <mainStack.Screen 
          name="EditInfoScreen"
          component={EditInfoScreen}
          options={{headerShown: false}}
        />
    </mainStack.Navigator>
  )
}