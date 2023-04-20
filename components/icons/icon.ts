import { StyleProp, ViewStyle } from "react-native";

export interface IIcon{
    color?: string;
    onPress?: () => void;
    width?: number | string;
    height?: number | string;
    style?: StyleProp<ViewStyle>;
}