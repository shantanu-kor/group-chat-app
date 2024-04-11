import {createSlice} from '@reduxjs/toolkit';

const intialAuthState = {isAuth: false};

const authSlice = createSlice({
    name: "Authentication",
    initialState: intialAuthState,
    reducers: {
        setTrue(state) {
            state.isAuth = true
        },
        setFalse(state) {
            state.isAuth = false
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;