import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/top_bar";
import GlobalStyles from "../../consts/styles";
import { HomeScreenProps } from "../../navigation/types";

export default function HomeScreen({ navigation } : HomeScreenProps){
  return (
    <SafeAreaView style={GlobalStyles.background}>
      <TopBar title="Schedule" />
      <View style={styles.scheduleContainer}>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scheduleContainer: {
    marginTop: 25,
    width: "80%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  }
})