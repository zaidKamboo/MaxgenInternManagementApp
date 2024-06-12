import { configureStore } from "@reduxjs/toolkit";
import internSlice from "./Slices/internSlice";
import internsSlice from "./Slices/internsSlice";

const appStore = configureStore({
    reducer: {
        intern: internSlice?.reducer,
        interns: internsSlice?.reducer,
    },
});

export default appStore;
