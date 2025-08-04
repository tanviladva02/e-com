import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authAPI } from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ user: User; token: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ user: User; token: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  isAuthenticated: false,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "SET_LOADING", payload: true });
      authAPI
        .getProfile()
        .then((response) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: response.data, token },
          });
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch({ type: "LOGIN_FAILURE" });
        });
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });

      return { user, token };
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authAPI.register({ name, email, password });
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });

      return { user, token };
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
