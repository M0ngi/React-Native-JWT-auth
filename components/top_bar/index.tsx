import { StyleSheet, View } from "react-native";
import UnderlinedTitle from "../underlined_title";
import Icon from 'react-native-vector-icons/Octicons';
import { useGetUserInfo } from "../../hooks/user/user_data";

interface ITopBar{
    title: string;
    lineWidth?: number;
}

export default function TopBar({title, lineWidth}: ITopBar){
    const {data} = useGetUserInfo();

    return (
        <View style={styles.titleContainer}>
            <UnderlinedTitle title={title} lineWidth={lineWidth} />
            <Icon size={24} color="green" name='verified' />
            {/* <Icon size={24} color="red" name='unverified' /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
      marginTop: 25,
      marginLeft: 25,
      marginRight: 25,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
});