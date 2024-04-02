import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import alertSlice from "./Slices/alertSlice";
import usersSlice from "./Slices/usersSlice";
import teamSlice from "./Slices/teamSlice";

const AppStore = configureStore({
    reducer: {
        user: userSlice.reducer,
        users: usersSlice.reducer,
        alertr: alertSlice.reducer,
        team: teamSlice.reducer,
    },
});

export default AppStore;
