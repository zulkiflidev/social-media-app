import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isInitialized: false,
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setCredentials:(state, 
                            action: PayloadAction<{user: User, token: string}>) => {

                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isInitialized = true;

            },

            setInitialized: (state) => {
                state.isInitialized = true;
            },


            logout: (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.isInitialized = true;
            }
        }
    }
);

export const { setCredentials, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;