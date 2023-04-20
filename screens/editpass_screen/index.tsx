import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/top_bar";
import { AppContext } from "../../context/app_context/app_context";
import { AppAct } from "../../context/app_context/types";
import { useChangePass } from "../../hooks/user/changepass";
import InputBox from "./../../components/InputBox";
import RoundedButton from "./../../components/RoundedButton";
import Colors from "./../../consts/colors";
import GlobalStyles from "./../../consts/styles";
import {  EditPassScreenProps } from "./../../navigation/types";
import { screenHeight, screenWidth } from "./../../utils/size_config";

export default function EditPassScreen({ navigation } : EditPassScreenProps){
  const [currentPass, setCurrentPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPassword, setNewPass] = useState("");

  const changePass = useChangePass();
  const { dispatchApp } = useContext(AppContext);

  const updatePassword = () => {
    if(newPassword != confirmPass){
      dispatchApp({
				type: AppAct.ERROR, 
				payload:  "Confirmation password doesn't match." 
			})
      return;
    }
    changePass.mutate({
      currentPass: currentPass,
      password: newPassword
    })
  }
  return (
    <SafeAreaView style={GlobalStyles.background}>
      <TopBar lineWidth={screenWidth(.26)} title="Change Password" />

      <View style={styles.container}>
        <View style={styles.txtEditContainer}>
          <InputBox
            value={currentPass}
            onChange={setCurrentPass}
            placeholder="Current password"
            secureTextEntry={true}
          />
          <InputBox
            value={newPassword}
            onChange={setNewPass}
            placeholder="New password"
            secureTextEntry={true}
          />
          <InputBox
            value={confirmPass}
            onChange={setConfirmPass}
            placeholder="Confirm New password"
            secureTextEntry={true}
          />
        </View>

        <RoundedButton 
          onPress={updatePassword} 
          style={{width: "60%", fontSize: 18, paddingTop: 10, paddingBottom: 10}} 
          text="Change password"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  txtEditContainer: {
    width: "80%",
  },
  backLogin:{
    color: Colors.text,
    fontSize: 14,
    height: 20,
    textAlignVertical: "center",
    marginTop: 10
  },
  container: {
    height: screenHeight(.45),
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
});