import { StyleSheet } from "react-native";
import Colors from "./colors";

const GlobalStyles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  }
})

export default GlobalStyles;