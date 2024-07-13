import axios from "axios";
import { IReview } from "../types/product";

type IPostReviewResponse = {
    status: "success" | "error";
    message: IReview[];
};

export const postReview = async (
    productId: string,
    review: Partial<IReview>
) => {
    const response = await axios.post<IPostReviewResponse>(
        `/api/products/${productId}/reviews`,
        review,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
