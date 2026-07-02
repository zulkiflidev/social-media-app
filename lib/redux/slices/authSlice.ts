import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
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
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
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

            },

            logout: (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            }
        }
    }
);

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;