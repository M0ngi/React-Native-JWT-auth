import React from "react";

export type  IAppState = {
    error: string | null;
    info: string | null;
    loading: boolean;
};

export interface IAppContext{
    appState: IAppState;
    dispatchApp: React.Dispatch<AppActions>;
}

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
    : {
          type: Key;
          payload: M[Key];
        };
};
  
export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export enum AppAct {
    ERROR = "LOGIN",
    RESET = "RESET",
    INFO = "INFO",
    LOAD_ON = "LOAD_ON",
    LOAD_OFF = "LOAD_OFF",
}
  
export type AppPayload = {
    [AppAct.RESET]: undefined;
    [AppAct.LOAD_ON]: undefined;
    [AppAct.LOAD_OFF]: undefined;
    [AppAct.ERROR]: string;
    [AppAct.INFO]: string;
};

export const defaultState : IAppState = {
    error: null,
    info: null,
    loading: false,
}