import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    }
});

export const { setCart } = slice.actions;
export default slice.reducer;