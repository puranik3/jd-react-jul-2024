export interface IReview {
    _id?: string;
    username: string;
    rating: number;
    date: Date | string;
    text: string;
}

export interface IProduct {
    _id?: string;
    title: string;
    price: number;
    description: string;
    category:
        | "men's clothing"
        | "women's clothing"
        | "jewelery"
        | "electronics";
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    reviews: IReview[];
}
