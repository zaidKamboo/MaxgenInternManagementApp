import { createSlice } from "@reduxjs/toolkit";

const initialState = { interns: [] };

const internsSlice = createSlice({
    name: "interns",
    initialState,
    reducers: {
        setInterns: (state, action) => {
            state.interns = action.payload;
            state.refresh = !state.refresh;
        },
        resetInterns: () => {
            return initialState;
        },
    },
});

export const { setInterns, resetInterns } = internsSlice.actions;
export default internsSlice;
