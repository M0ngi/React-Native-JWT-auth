import { useState, useContext } from "react";
import { Button, Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../../consts/colors";
import { PRIVACY_POLICY } from "../../../consts/consts";
import { useLogin } from "../../../hooks/auth/login";
import InputBox from "../../InputBox";
import RoundedButton from "../../RoundedButton";
import { AppAct } from "../../../context/app_context/types";
import { AppContext } from "../../../context/app_context/app_context";

export default function LoginSection({navigation}: any){
    const login = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { dispatchApp } = useContext(AppContext)

    const loginHandler = () => {
        if(password.length < 6){
            dispatchApp({type: AppAct.ERROR, payload: "Invalid password."})
            return;
        }
        if(!email.includes("@")){
            dispatchApp({type: AppAct.ERROR, payload: "Invalid email."})
            return;
        }
        login.mutate({
            email,
            password,
        })
    }
    return (
        <View style={style.container}>
            <View style={style.txtEditContainer}>
                <InputBox value={email} onChange={setEmail} placeholder="Email" />
                <InputBox secureTextEntry={true} value={password} onChange={setPassword} placeholder="Password" />

                <Text style={style.resetpass} onPress={null}>Reset Password</Text>
            </View>

            <RoundedButton onPress={loginHandler} style={{width: "60%", fontSize: 24}} text="Login" />

            <Text style={style.privPolicy} onPress={() => Linking.openURL(PRIVACY_POLICY)}>View our Privacy Policy</Text>
        </View>
    )
}

const style = StyleSheet.create({
    resetpass:{
        color: Colors.text,
        fontSize: 14,
        height: 20,
        textAlignVertical: "center",
        marginTop: 10,
        fontFamily: "Open Sans"
    },
    privPolicy:{
        color: Colors.textGray,
        fontSize: 14,
        height: 20,
        textAlignVertical: "center",
    },
    txtEditContainer: {
        width: "80%",
    },
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    }
})