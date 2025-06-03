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
  async (userId) => {
    if (!userId) throw new Error("User ID is required to fetch cart");
    return await apiGetCart(userId);
  },
);

// export const addItemToServer = createAsyncThunk(
//   "cart/addItemToServer",
//   async ({ item, userId }, { dispatch }) => {
//     await apiAddToCart(item);
//     dispatch(fetchCartFromServer(userId)); // Atualiza local
//   },
// );
export const addItemToServer = createAsyncThunk(
  "cart/addItemToServer",
  async (item, { dispatch }) => {
    await apiAddToCart(item);
    dispatch(fetchCartFromServer()); // Atualiza local
  },
);

export const updateItemQuantityOnServer = createAsyncThunk(
  "cart/updateItemQuantityOnServer",
  async ({ pizzaId, quantity, userId }, { dispatch }) => {
    await apiUpdateCartItem(pizzaId, quantity);
    dispatch(fetchCartFromServer(userId));
  },
);

export const deleteItemFromServer = createAsyncThunk(
  "cart/deleteItemFromServer",
  async ({ pizzaId, userId }, { dispatch }) => {
    await apiDeleteCartItem(pizzaId);
    dispatch(fetchCartFromServer(userId));
  },
);

export const clearCartOnServer = createAsyncThunk(
  "cart/clearCartOnServer",
  async (userId, { dispatch }) => {
    if (!userId) throw new Error("User ID is required to clear cart");

    await apiClearCart(userId); // ✅ pass userId
    dispatch(fetchCartFromServer(userId)); // if this also needs userId
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
