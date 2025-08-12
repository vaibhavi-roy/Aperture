import { createSlice } from '@reduxjs/toolkit';

const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {
        globalLoader: false,
        // specificLoader: false,
    },
    reducers: {
        showGlobalLoader: (state) => {
            state.globalLoader = true;
        },
        hideGlobalLoader: (state) => {
            state.globalLoader = false;
        },
        // showSpecificLoader: (state) => {
        //     state.specificLoader = true;
        // },
        // hideSpecificLoader: (state) => {
        //     state.specificLoader = false;
        // },
    },
});

export const {
    showGlobalLoader,
    hideGlobalLoader,
    // showSpecificLoader,
    // hideSpecificLoader,
} = loadersSlice.actions;

export default loadersSlice.reducer;
