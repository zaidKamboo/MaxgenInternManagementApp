import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
    name: "team",
    initialState: [],
    reducers: {
        setTeam: (state, action) => {
            return action.payload;
        },
        resetTeam: () => {
            return [];
        },
    },
});

export const { setTeam, resetTeam } = teamSlice.actions;

export default teamSlice;
