import { IProduct } from "./product";

export interface ICartItem {
    product: string | IProduct;
    quantity: number;
}
