import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/auth_context/auth_context";
import MainNavigator from "./main_navigator";
import AuthNavigator from "./auth_navigator";
import { AuthAct } from "../context/auth_context/types";
import loadUser from "../hooks/auth/load_user";
import { AppContext } from "../context/app_context/app_context";
import { AppAct } from "../context/app_context/types";
import { navigationRef } from "./root_navigation";


export default function Navigation(){
  const { auth } = useContext(AuthContext);
  const { appState, dispatchApp } = useContext(AppContext);
  const {isError, isLoading, userData} = loadUser();
  const {dispatchAuth} = useContext(AuthContext);

  useEffect(()=>{
    dispatchAuth({type: AuthAct.RESTORE, payload: userData})
  }, [userData])

  useEffect(()=>{
    if(isLoading) dispatchApp({type: AppAct.LOAD_ON})
    else dispatchApp({type: AppAct.LOAD_OFF})
  }, [isLoading])
  
  return (
    <NavigationContainer ref={navigationRef}>
      {
        auth.user ? <MainNavigator /> : <AuthNavigator />
      }
    </NavigationContainer>
  )
}