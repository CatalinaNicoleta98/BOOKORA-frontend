

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { AuthState, AuthUser } from "../types/auth.types";

// --------------------
// State
// --------------------

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false
};

// --------------------
// Actions
// --------------------

type AuthAction =
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: { token: string; user: AuthUser } }
    | { type: "LOGOUT" };

// --------------------
// Reducer
// --------------------

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                isLoading: true
            };

        case "LOGIN_SUCCESS":
            return {
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                isLoading: false
            };

        case "LOGOUT":
            return {
                isAuthenticated: false,
                token: null,
                user: null,
                isLoading: false
            };

        default:
            return state;
    }
};

// --------------------
// Context
// --------------------

type AuthContextType = {
    state: AuthState;
    loginSuccess: (token: string, user: AuthUser) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --------------------
// Provider
// --------------------

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const loginSuccess = (token: string, user: AuthUser) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                loginSuccess,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// --------------------
// Hook
// --------------------

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};