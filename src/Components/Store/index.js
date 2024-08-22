import { configureStore } from "@reduxjs/toolkit";
import internSlice from "./Slices/internSlice";
import internsSlice from "./Slices/internsSlice";
import alertSlice from "./Slices/alertSlice";

const appStore = configureStore({
    reducer: {
        intern: internSlice?.reducer,
        interns: internsSlice?.reducer,
        alertState: alertSlice?.reducer,
    },
});

export default appStore;
