import axios from "axios";
import { ICartItem } from "@/types/cart";

type IGetOrPutCartResponse = {
    status: "success" | "error";
    message: {
        cart: ICartItem[];
    };
};

export const getCart = async () => {
    const response = await axios.get<IGetOrPutCartResponse>(`/api/cart`);
    return response.data;
};

export const updateCart = async (
    cart: { productId: string; quantity: number }[]
) => {
    const response = await axios.put<IGetOrPutCartResponse>(`/api/cart`, cart, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};