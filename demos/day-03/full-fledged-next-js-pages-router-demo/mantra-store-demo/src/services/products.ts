import axios from "axios";
import { IProduct } from "../types/product";

type IGetProductsResponse = {
    status: "success" | "error";
    message: {
        count: number;
        page: number;
        products: IProduct[];
    };
};

export const getProducts = async (page: number = 1) => {
    const response = await axios.get<IGetProductsResponse>(
        `/api/products?page=${page}`
        // {
        //     params: {
        //         page: page
        //     }
        // }
    );
    return response.data;
};
