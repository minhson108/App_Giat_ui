import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name:"Giỏ hàng",
    initialState:{
        cart:[],
    },
    reducers:{
        addToCart:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            if(itemPresent){
                itemPresent.quantify++;
            } else{
                state.cart.push({...action.payload,quantify:1})
            }
        },
        removeFromCart:(state,action) => {
            const removeItem = state.cart.filter((item) => item.id === action.payload.id);
            state.cart = removeItem;
        },
        incrementQuantify:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            itemPresent.quantify++;
        },
        decrementQuantify:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            if(itemPresent.quantify == 1){
                itemPresent.quantify = 0;
                const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            }else{
                itemPresent.quantify--;
            }
        },
        cleanCart:(state) => {
            state.cart = [];
        }
    }
});


export const {addToCart,removeFromCart,incrementQuantify,decrementQuantify,cleanCart} = CartSlice.actions;

export default CartSlice.reducer;