import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null,
    show: false,
    type: null,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.message = action.payload.message;
            state.show = action.payload.show;
            if (!state.type) {
                state.type = action.payload.type;
            }
        },
        resetAlert: () => initialState,
    },
});

export const { setAlert, resetAlert } = alertSlice.actions;

export default alertSlice;
