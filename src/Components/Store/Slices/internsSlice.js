import { createSlice } from "@reduxjs/toolkit";

const initialState = { interns: [], refresh: false };

const internsSlice = createSlice({
    name: "interns",
    initialState,
    reducers: {
        setInterns: (state, action) => {
            state.interns = action.payload;
            state.refresh = !state.refresh;
        },
        toggleRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        resetInterns: () => {
            return initialState;
        },
    },
});

export const { setInterns, resetInterns, toggleRefresh } = internsSlice.actions;
export default internsSlice;
