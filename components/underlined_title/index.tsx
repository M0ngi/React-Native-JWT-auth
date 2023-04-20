import { StyleSheet, Text, View } from "react-native";
import Colors from "../../consts/colors";

interface IUnderlinedTitle{
    title: string;
    lineWidth?: number;
}

export default function UnderlinedTitle({title, lineWidth}: IUnderlinedTitle){
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={{...styles.underLine, width: lineWidth ?? 40}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.text,
        fontFamily: "Open Sans Bold",
        fontSize: 25
    },
    titleContainer:{
        alignSelf: "flex-start",
    },
    underLine:{
        height: 4,
        backgroundColor: Colors.green,
        marginTop: 5,
        borderRadius: 20
    },
})