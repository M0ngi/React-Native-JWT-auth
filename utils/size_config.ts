import { Dimensions } from 'react-native';

export function screenWidth(perc?: number): number{
    return Dimensions.get('window').width * (perc ?? 1)
}

export function screenHeight(perc?: number): number{
    return Dimensions.get('window').height * (perc ?? 1)
}