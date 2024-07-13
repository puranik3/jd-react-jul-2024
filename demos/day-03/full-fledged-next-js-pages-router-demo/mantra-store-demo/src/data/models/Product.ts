import mongoose from "mongoose";
import { IProduct, IReview } from "@/types/product";

export const Review = new mongoose.Schema<IReview>({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        required: true,
        minlength: 20,
    },
});

export const schema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value: any) {
                return typeof value === "number";
            },
            message: "price must be a number.",
        },
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["men's clothing", "women's clothing", "jewelery", "electronics"],
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        // required: true,
        rate: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        count: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    reviews: {
        type: [Review],
        default: [],
    },
});

if (!mongoose.modelNames().includes("Product")) {
    mongoose.model<IProduct>("Product", schema);
}
