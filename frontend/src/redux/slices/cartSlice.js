// to create a slice -> redux;

import { createSlice } from "@reduxjs/toolkit";
//1
const cartSlice = createSlice({
  name: "countername",
  initialState: {
    cartQuantity: 0,
    // array of object -> [{details or th product, individal quantity},]
    cartProducts: [],
  },
  // all the update logic
  reducers: {
    addToCart: (state, action) => {
      state.cartQuantity++; // Increase overall cart quantity
      const productToBeAdded = action.payload;

      // Find product in cart
      const existingProductIndex = state.cartProducts.findIndex(
        (cProduct) => cProduct.id === productToBeAdded.id
      );

      if (existingProductIndex === -1) {
        // If not in cart, add with quantity 1
        state.cartProducts.push({ ...productToBeAdded, indQuantity: 1 });
      } else {
        // If already in cart, increment quantity immutably
        state.cartProducts[existingProductIndex] = {
          ...state.cartProducts[existingProductIndex],
          indQuantity: state.cartProducts[existingProductIndex].indQuantity + 1,
        };
      }
    },
    deleteFromCart: (state, action) => {
      const productToRemove = action.payload;
      const productIdx = state.cartProducts.findIndex(
        (cProduct) => cProduct.id === productToRemove.id
      );

      if (productIdx !== -1) {
        let product = state.cartProducts[productIdx];

        // If quantity is 1, remove product from cart
        if (product.indQuantity === 1) {
          state.cartProducts.splice(productIdx, 1);
        } else {
          // Otherwise, just decrement quantity
          state.cartProducts[productIdx].indQuantity--;
        }

        // Decrease cart quantity
        state.cartQuantity--;
      }
    },
  },
});

export const action = cartSlice.actions;
export default cartSlice;
