import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
  AuthScreen: undefined;
};

type MainStackParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
  EditPassScreen: undefined;
  EditInfoScreen: undefined;
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;  

export type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'HomeScreen'>;  
export type SettingsScreenProps = NativeStackScreenProps<MainStackParamList, 'SettingsScreen'>;  
export type EditPassScreenProps = NativeStackScreenProps<MainStackParamList, 'EditPassScreen'>;  
export type EditInfoScreenProps = NativeStackScreenProps<MainStackParamList, 'EditInfoScreen'>;  
