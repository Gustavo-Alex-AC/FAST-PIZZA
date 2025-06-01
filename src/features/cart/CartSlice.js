import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  deleteCartItem as apiDeleteCartItem,
  clearCart as apiClearCart,
} from "../../services/apiRestaurant";

// THUNKS
export const fetchCartFromServer = createAsyncThunk(
  "cart/fetchCartFromServer",
  async () => {
    const data = await apiGetCart();
    return data;
  },
);

export const addItemToServer = createAsyncThunk(
  "cart/addItemToServer",
  async (item, { dispatch }) => {
    await apiAddToCart(item);
    dispatch(fetchCartFromServer()); // Atualiza local
  },
);

export const updateItemQuantityOnServer = createAsyncThunk(
  "cart/updateItemQuantityOnServer",
  async ({ pizzaId, quantity }, { dispatch }) => {
    await apiUpdateCartItem(pizzaId, quantity);
    dispatch(fetchCartFromServer());
  },
);

export const deleteItemFromServer = createAsyncThunk(
  "cart/deleteItemFromServer",
  async (pizzaId, { dispatch }) => {
    await apiDeleteCartItem(pizzaId);
    dispatch(fetchCartFromServer());
  },
);

export const clearCartOnServer = createAsyncThunk(
  "cart/clearCartOnServer",
  async (_, { dispatch }) => {
    await apiClearCart();
    dispatch(fetchCartFromServer());
  },
);

// STATE
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartFromServer.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

// ACTIONS
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// SELECTORS
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
