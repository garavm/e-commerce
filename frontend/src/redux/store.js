import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import * as middleware from 'redux-thunk';  // ✅ Import correctly as `thunk`


const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware.thunk),
});

export default store;
