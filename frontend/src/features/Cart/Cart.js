import { createSlice } from "@reduxjs/toolkit";
const userName = localStorage.getItem("userName") || "Login/Register";
export const cart = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    searchState: "",
    username: userName,
    faveItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = removeItem;
    },
    removeAll: (state, action) => {
      // const removeItem = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItems = [];
    },

    toggleSearch: (state, action) => {
      state.searchState = action.payload;
    },
    toggleUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("userName", state.username);
    },
    addToFav: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.isFav = true;
      } else {
        state.faveItems.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAll,
  toggleSearch,
  toggleUsername,
  addToFav,
} = cart.actions;

export default cart.reducer;
