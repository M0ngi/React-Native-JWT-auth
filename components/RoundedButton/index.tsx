import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Colors from "../../consts/colors";

interface IRoundedButton{
    style?:{
        width?: number | string;
        height?: number | string;
        color?: string;
        paddingTop?: number;
        paddingBottom?: number;
        borderRadius?: number;
        fontSize?: number;
        textColor?: string;
        marginTop?: number;
    };
    text: string;
    onPress: () => void
}

export default function RoundedButton({text, style, onPress} : IRoundedButton){
    const textStyle = {
        ...styles.loginBtn, 
        backgroundColor: style?.color ?? styles.loginBtn.backgroundColor,
        fontSize: style?.fontSize ?? styles.loginBtn.fontSize,
        paddingBottom: style?.paddingBottom ?? styles.loginBtn.paddingBottom,
        paddingTop: style?.paddingTop ?? styles.loginBtn.paddingTop,
        color: style?.textColor ?? styles.loginBtn.color,
    }
    const viewStyle: ViewStyle = {
        borderRadius: style?.borderRadius ?? 50, 
        width: style?.width ?? "100%", 
        height: style?.height,
        overflow: "hidden",
    }
    return (
        <View style={viewStyle}>
            <Text style={textStyle} onPress={onPress}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loginBtn:{
        color: "#fff",
        backgroundColor: Colors.green,
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: "center",
        fontFamily: "Open Sans Bold",
        fontSize: 30,
        fontWeight: "bold",
    },
})