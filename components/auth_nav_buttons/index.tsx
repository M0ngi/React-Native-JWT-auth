import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import { AppContext } from "../../context/app_context/app_context";
import { AppAct } from "../../context/app_context/types";

interface IAuthNavButtons{
    onSelectLogin: () => void;
    onSelectRegister: () => void;
}

export default function AuthNavButtons({onSelectLogin, onSelectRegister} : IAuthNavButtons){
    const [selectedIdx, setSelectedIdx] = useState(0);

    const selectLogin = () => {
        if(selectedIdx != 0) setSelectedIdx(0);
        onSelectLogin();
    }
    const selectRegister = () => {
        if(selectedIdx != 1) setSelectedIdx(1);
        onSelectRegister();
    }

    return (
        <View style={style.container}>
            <Text 
                onPress={selectLogin} 
                style={{
                    ...style.navBtn, 
                    ...(selectedIdx == 0 ? style.selectedBtn : {})
                }}>
                    Login
            </Text>
            <Text 
                onPress={selectRegister} 
                style={{
                    ...style.navBtn, 
                    ...(selectedIdx == 1 ? style.selectedBtn : {})
                }}>
                    Signup
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    selectedBtn:{
        borderBottomColor: "#01BDAF",
        borderBottomWidth: 3
    },
    navBtn: {
        color: "#fff",
        height: "100%",
        fontFamily: "Open Sans",
        fontWeight: "bold",
        fontSize: 26,
        width: "30%",
        textAlign: "center",
        textAlignVertical: "center",
    },
    container: {
        width: "100%",
        height: "100%",
        maxHeight: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
})