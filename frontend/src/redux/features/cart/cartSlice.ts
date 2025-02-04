import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export type ICart = {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  stock: number;
  image: string;
};

type ICartState = {
  carts: ICart[];
};

const cartValue = {
  carts: [],
};

const loadState = () => {
  const storedState = localStorage.getItem("cartState");
  return storedState ? JSON.parse(storedState) : cartValue;
};

const initialState: ICartState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const oldCarts = state.carts;
      const { car, selectedQuantity } = action.payload;
      const { _id, name, category, price, stock, image } = car;

      //   check if the item is already in the cart
      const isExistingItem = oldCarts?.find((item) => item?._id == _id);

      if (isExistingItem) {
        toast.error("Item already in cart");
        return;
      } else {
        state.carts.push({
          _id,
          name,
          price,
          category,
          quantity: selectedQuantity,
          stock,
          image,
        });
        localStorage.setItem("cartState", JSON.stringify(state));
        toast.success("Item added to cart successfully");
      }
    },

    buyNow: (state, action) => {
      const { car, selectedQuantity } = action.payload;
      const { _id, name, category, price, stock, image } = car;

      state.carts = [
        {
          _id,
          name,
          price,
          category,
          quantity: selectedQuantity,
          stock,
          image,
        },
      ];

      localStorage.setItem("cartState", JSON.stringify(state));

      toast.success("Item added to cart successfully");
    },

    removeFromCart: (state, action) => {
      const { _id } = action.payload;
      const oldCarts = state.carts;
      //   check if the item is already in the cart
      const isExistingItem = oldCarts?.find((item) => item?._id == _id);

      if (isExistingItem) {
        state.carts = oldCarts?.filter((item) => item?._id !== _id);
        localStorage.setItem("cartState", JSON.stringify(state));
        toast.success("Item removed from cart");
      } else {
        toast.error("Item not found in cart");
      }
    },

    clearCart: (state) => {
      state.carts = [];
      localStorage.setItem("cartState", JSON.stringify(state));
      toast.success("Item removed from cart");
    },

    clearCartAfterOrder: (state) => {
      state.carts = [];
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    changeQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const oldCarts = state.carts;

      const cartItem = oldCarts?.find((item) => item?._id === _id);

      if (!cartItem) {
        toast.error("Item not found in cart");
      } else {
        cartItem.quantity = quantity;
      }

      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  changeQuantity,
  buyNow,
  clearCartAfterOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
