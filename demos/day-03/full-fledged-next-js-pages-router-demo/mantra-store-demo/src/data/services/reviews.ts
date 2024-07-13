import mongoose from "@/data/init";
import { IReview } from "@/types/product";

const Product = mongoose.model("Product");

export const createReview = async (_id: string, review: IReview) => {
    console.log("_id = ", _id);
    const product = await Product.findByIdAndUpdate(
        _id,
        {
            $push: {
                reviews: review,
            },
        },
        { new: true }
    );

    console.log("product with updated reviews = ", product);

    const serializedProductReviews = product.reviews.map((review: any) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });
    return serializedProductReviews.reviews;
};
