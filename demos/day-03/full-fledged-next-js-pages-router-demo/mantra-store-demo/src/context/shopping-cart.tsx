import { createContext, useContext } from "react";
import { ICartItem } from "@/types/cart";

const CartContext = createContext({
    cart: [] as any[],
    changeQuantity: (productId: string | undefined, quantity: number) => {},
    setCart: (cart: ICartItem[]) => {},
});

export const CartProvider = CartContext.Provider;

export const useCart = () => useContext(CartContext);
