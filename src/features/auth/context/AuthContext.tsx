import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type {
    AuthSession,
    AuthState,
    AuthUser,
    LoginCredentials
} from "../types/auth.types";
import { authStorage } from "../services/authStorage";
import { authService } from "../services/authService";

// --------------------
// State
// --------------------

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: true
};

// --------------------
// Actions
// --------------------

type AuthAction =
    | { type: "INIT_START" }
    | { type: "INIT_SUCCESS"; payload: { token: string; user: AuthUser } }
    | { type: "INIT_FAIL" }
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: { token: string; user: AuthUser } }
    | { type: "LOGOUT" }
    | { type: "UPDATE_USER"; payload: { user: AuthUser } };

// --------------------
// Reducer
// --------------------

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "INIT_START":
            return {
                ...state,
                isLoading: true
            };

        case "INIT_SUCCESS":
            return {
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                isLoading: false
            };

        case "INIT_FAIL":
            return {
                isAuthenticated: false,
                token: null,
                user: null,
                isLoading: false
            };

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

        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload.user
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
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --------------------
// Provider
// --------------------

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const initAuth = async () => {
            const token = authStorage.getToken();

            if (!token) {
                dispatch({ type: "INIT_FAIL" });
                return;
            }

            dispatch({ type: "INIT_START" });

            try {
                const user = await authService.getCurrentUser(token);

                dispatch({
                    type: "INIT_SUCCESS",
                    payload: { token, user }
                });
            } catch (error) {
                authStorage.removeToken();
                dispatch({ type: "INIT_FAIL" });
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        dispatch({ type: "LOGIN_START" });

        const session: AuthSession = await authService.login(credentials);

        authStorage.setToken(session.token);

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                token: session.token,
                user: session.user
            }
        });
    };

    const logout = () => {
        authStorage.removeToken();
        dispatch({ type: "LOGOUT" });
    };

    const updateUser = (user: AuthUser) => {
        dispatch({
            type: "UPDATE_USER",
            payload: { user }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
                updateUser
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