import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "token",
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setToken } = slice.actions;
export default slice.reducer;