import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "Hellio",
    type: "success",
    show: false,
};

const alertSlice = createSlice({
    initialState,
    name: "alert",
    reducers: {
        showAlert: (state, payload) => {
            console.log(payload);
            return payload;
        },
        hideAlert: () => {
            return initialState;
        },
    },
});

export const { showAlert, hideAlert } = alertSlice?.actions;
export default alertSlice;
