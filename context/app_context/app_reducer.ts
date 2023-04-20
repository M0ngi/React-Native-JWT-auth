import { AppAct, AppActions, IAppState, defaultState } from "./types";

export const appReducer = (state: IAppState, action: AppActions) : IAppState => {
    switch(action.type){
        case AppAct.ERROR:{
            return {...state, error: action.payload};
        }
        case AppAct.INFO:{
            return {...state, info: action.payload};
        }
        case AppAct.RESET: {
            return defaultState;
        }

        case AppAct.LOAD_OFF: {
            return {...state, loading: false};
        }
        case AppAct.LOAD_ON: {
            return {...state, loading: true};
        }
    }
}