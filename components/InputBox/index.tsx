import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";
import Colors from "../../consts/colors";

interface IInputBox {
    style?: StyleProp<TextStyle>;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    editable?: boolean;
    textColor?: string;
    secureTextEntry?: boolean;
}

export default function InputBox({secureTextEntry, value, style = {}, onChange, placeholder, editable, textColor}: IInputBox){
    return (
        <TextInput
            secureTextEntry={secureTextEntry}
            value={value}
            editable={editable}
            onChangeText={onChange}
            style={{...styles.textEdit, ...(style as Object)}}
            placeholder={placeholder}
            placeholderTextColor={textColor ?? Colors.textGray}
        />
    )
}

const styles = StyleSheet.create({
    textEdit: {
        borderBottomWidth: 1, 
        borderColor: "#E1E1E1",
        width: "100%",
        marginTop: 10,
        height: 48,
        color: Colors.text,
    },
})