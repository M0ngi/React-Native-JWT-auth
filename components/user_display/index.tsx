import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../consts/colors";
import { AuthContext } from "../../context/auth_context/auth_context";
import ProfileIcon from "../icons/profile_icon";

interface IUserDisplay{
    width?: number;
    height?: number;
}

export default function UserDisplay({width, height}: IUserDisplay){
    const { auth } = useContext(AuthContext);
    const verified = true;
    const emailStatus = {
        ...styles.emailStatus,
        color: verified ? "green" : "red,"
    }
    return (
        <View style={{...styles.mainContainer, width: width ?? "100%", height: height ?? "100%"}}>
            <ProfileIcon width={"30%"} height={"45%"} />
            <View style={styles.textContainer}>
                <Text style={styles.displayName}>{auth.user.fullname}</Text>
                <Text style={emailStatus}>Email {verified ? "verified" : "unverified"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.lightGray,
        borderRadius: 25,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16
    },
    textContainer:{
        height: "45%"
    },
    displayName: {
        fontFamily: "Open Sans Bold",
        color: Colors.text,
        fontSize: 18
    },
    emailStatus:{
        fontFamily: "Open Sans",
        marginLeft: 16,
        marginTop: 4,
    }
})