import React, { createContext, useMemo, useReducer } from "react";
import { appReducer } from "./app_reducer";
import { IAppContext, defaultState } from "./types";

export const AppContext = createContext<IAppContext>({
  appState: defaultState,
  dispatchApp: () => {}
});

export const AppConsumer = AppContext.Consumer;

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const [appState, dispatchApp] = useReducer(appReducer, defaultState);
  
  const contextValue = useMemo(() => {
    return { appState, dispatchApp };
  }, [appState, dispatchApp]);

  return (
    <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
  );
}
