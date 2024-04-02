import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        resetUser: () => {
            return initialState;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;
