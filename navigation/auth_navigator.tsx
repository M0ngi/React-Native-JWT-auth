import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from "../screens/auth/auth_screen";

const authStack = createNativeStackNavigator();

export default function AuthNavigator(){
  return (
    <authStack.Navigator initialRouteName="AuthScreen">
      <authStack.Screen name="AuthScreen" component={AuthScreen} options={{headerShown: false}} />
    </authStack.Navigator>
  )
}