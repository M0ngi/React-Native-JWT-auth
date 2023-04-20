import Svg, { Path } from "react-native-svg";
import Colors from "../../../consts/colors";
import { IIcon } from "../icon";

export default function ProfileIcon({color, width, height, style} : IIcon){
    return(
        <Svg style={style} width={width ?? "24"} height={height ?? "24"} viewBox="0 0 24 24" fill="none">
            <Path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21" stroke={color ?? Colors.botNavColors} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke={color ?? Colors.botNavColors} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}