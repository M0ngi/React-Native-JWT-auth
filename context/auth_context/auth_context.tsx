import React, { createContext, useMemo, useReducer } from "react";
import { authReducer } from "./auth_reducer";
import { IAuthContext, loggedOutState } from "./types";

export const AuthContext = createContext<IAuthContext>({
  auth: loggedOutState,
  dispatchAuth: () => {}
});

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, loggedOutState);
  
  const contextValue = useMemo(() => {
    return { auth, dispatchAuth };
  }, [auth, dispatchAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthConsumer>
      {
        (context) => {
          return children;
        }
      }
      </AuthConsumer>
    </AuthContext.Provider>
  );
}
