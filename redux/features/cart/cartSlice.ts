import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/redux/store";

interface Product {
  id: string;
  quantity: number;
}

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
      const exists = state.products.some((item) => item.id === product.id);
      if (!exists) {
        state.products.push(product);
        toast.success("Product added to cart");
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
      toast.success("Product removed from cart");
    },
    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.products = state.products.filter((p) => p.id !== id);
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const useCartProducts = (): Product[] => {
  return useSelector((state: RootState) => state.cart.products);
};

export const useCartProduct = (id: string): Product | undefined => {
  return useSelector((state: RootState) =>
    state.cart.products.find((product) => product.id === id),
  );
};

export const useCartCount = (): number => {
  return useSelector((state: RootState) => state.cart.products.length);
};
