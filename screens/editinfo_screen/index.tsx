import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/top_bar";
import { AppContext } from "../../context/app_context/app_context";
import { AppAct } from "../../context/app_context/types";
import { AuthContext } from "../../context/auth_context/auth_context";
import { useEditInfo } from "../../hooks/user/editinfo";
import InputBox from "./../../components/InputBox";
import RoundedButton from "./../../components/RoundedButton";
import Colors from "./../../consts/colors";
import GlobalStyles from "./../../consts/styles";
import {  EditInfoScreenProps } from "./../../navigation/types";
import { screenHeight, screenWidth } from "./../../utils/size_config";

export default function EditInfoScreen({ navigation } : EditInfoScreenProps){
  const { auth } = useContext(AuthContext);
  const [email, setEmail] = useState(auth.user.email ?? "");
  const [fullname, setFullname] = useState(auth.user.fullname ?? "");

  const changeInfo = useEditInfo();

  const updateInfo = () => {
    changeInfo.mutate({
      fullname,
      email,
    })
  }
  return (
    <SafeAreaView style={GlobalStyles.background}>
      <TopBar lineWidth={screenWidth(.2)} title="Change Info" />

      <View style={styles.container}>
        <View style={styles.txtEditContainer}>
          <InputBox
            value={fullname}
            onChange={setFullname}
            placeholder="Fullname"
          />
          <InputBox
            value={email}
            onChange={setEmail}
            placeholder="Email"
          />
        </View>

        <RoundedButton 
          onPress={updateInfo} 
          style={{width: "60%", fontSize: 18, paddingTop: 10, paddingBottom: 10}} 
          text="Change info"
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