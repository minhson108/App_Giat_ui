import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:"sản phẩm",
    initialState:{
        product:[],
    },
    reducers:{
        getProducts:(state,action) => {
            state.product.push({...action.payload});
        },
        incrementQty:(state,action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            itemPresent.quantify++;
        },
        decrementQty:(state,action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if(itemPresent.quantify == 1){
                itemPresent.quantify = 0;
                const removeItem = state.product.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            }else{
                itemPresent.quantify--;
            }
        }
    }
});

export const {getProducts,incrementQty,decrementQty} = productSlice.actions;
export default productSlice.reducer;