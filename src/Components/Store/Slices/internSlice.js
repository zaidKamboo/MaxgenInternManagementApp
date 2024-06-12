import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const internSlice = createSlice({
    name: "Intern",
    initialState,
    reducers: {
        setIntern: (state, action) => {
            return action.payload;
        },
        resetIntern: () => {
            return initialState;
        },
    },
});
export const { setIntern, resetIntern } = internSlice?.actions;
export default internSlice;
