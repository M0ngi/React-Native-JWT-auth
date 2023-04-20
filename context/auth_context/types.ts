import React from "react";
import { IUser } from "../../types";

export type IAuthState = {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export interface IAuthContext {
  auth: IAuthState;
  dispatchAuth: React.Dispatch<AuthActions>;
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

export type AuthActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export enum AuthAct {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  RESTORE = "RESTORE",
  REFRESH = "REFRESH",
  UPDATE = "UPDATE",
}

export type UserPayload = {
  [AuthAct.LOGIN]: IAuthState;
  [AuthAct.RESTORE]: IAuthState;
  [AuthAct.LOGOUT]: undefined;
  [AuthAct.REFRESH]: {
    accessToken: string,
    refreshToken: string,
  };
  [AuthAct.UPDATE]: IUser;
};

export const loggedOutState: IAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};