import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    filteredUsers: [],
    searchQuery: "",
    filters: { domain: "", gender: "", availability: "" },
    selectedUsers: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            let newState = state;
            newState.users = action.payload;
            newState.filteredUsers = action.payload;
            return newState;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
        setSelectedUsers(state, action) {
            state.selectedUsers = action.payload;
        },
        addToSelectedUsers(state, action) {
            state.selectedUsers.push(action.payload);
        },
        removeFromSelectedUsers: (state, action) => {
            const userIdToRemove = action.payload;
            state.selectedUsers = state.selectedUsers.filter(
                (user) => user.id !== userIdToRemove
            );
        },
        clearSelectedUsers(state) {
            state.selectedUsers = [];
        },
    },
});

export const {
    setUsers,
    setSearchQuery,
    setFilters,
    setSelectedUsers,
    clearSelectedUsers,
    addToSelectedUsers,
    removeFromSelectedUsers,
} = usersSlice.actions;

export default usersSlice;
