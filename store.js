import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "./CarReducer";
import ProductReducer from "./ProductReducer";

export default configureStore({
    reducer:{
        cart:CarReducer,
        product:ProductReducer
    }
})