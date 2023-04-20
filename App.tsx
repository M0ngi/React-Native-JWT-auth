import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View } from 'react-native';
import * as Network from 'expo-network';
import { useContext, useEffect, useState } from 'react';
import { AuthProvider } from './context/auth_context/auth_context';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './navigation';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppConsumer, AppContext, AppProvider } from './context/app_context/app_context';
import LoadingScreen from './screens/loading_screen';
import { AppAct } from './context/app_context/types';
import { useFonts } from 'expo-font';

const queryClient = new QueryClient()

export default function App() {
  const { dispatchApp } = useContext(AppContext);
  const [connected, setConnected] = useState(false);
  const [loaded, error] = useFonts({
    "Open Sans Bold": require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
    "Open Sans": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
  })

  useEffect(() => {
    Network.getNetworkStateAsync()
      .then((state) => {
        setConnected(state.isConnected && state.isInternetReachable);
      })
  }, [])

  if (!loaded) {
    return <LoadingScreen />;
  }

  if (!connected) {
    return (
      <View>
        <Text>
          You are offline
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider >
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AppConsumer>
            {
              (context) => {
                if (context.appState.error) {
                  Alert.alert("Error", context.appState.error, [
                    {
                      text: "Exit"
                    }
                  ], {
                    onDismiss: () => {
                      context.dispatchApp({ type: AppAct.RESET })
                    },
                    cancelable: true
                  })
                }

                if (context.appState.info) {
                  Alert.alert("Info", context.appState.info, [
                    {
                      text: "Ok"
                    }
                  ], {
                    onDismiss: () => {
                      context.dispatchApp({ type: AppAct.RESET })
                    },
                    cancelable: true
                  })
                }
                return (
                  <>
                    <AuthProvider>
                      <Navigation />
                    </AuthProvider>
                    {context.appState.loading && <LoadingScreen />}
                  </>
                )
              }
            }
          </AppConsumer>
        </AppProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
