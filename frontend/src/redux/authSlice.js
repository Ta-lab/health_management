import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('isAuthenticated', state.isAuthenticated);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
