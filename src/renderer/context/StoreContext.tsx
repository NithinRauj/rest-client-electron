import React, { createContext, Dispatch, useReducer } from "react";
import reducer, { Action, AppState, initialState } from "./reducer";

export const StoreContext = createContext<{ appState: AppState, dispatch: Dispatch<Action> }>(null);

const Provider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <StoreContext.Provider value={{ appState: state, dispatch }}>
        {props.children}
    </StoreContext.Provider>
}

export default Provider;

