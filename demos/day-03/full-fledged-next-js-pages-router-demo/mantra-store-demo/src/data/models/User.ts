import mongoose from "mongoose";
import { IUserCartItem, IUser } from "@/types/user";

export const CartItem = new mongoose.Schema<IUserCartItem>({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

export const schema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    cart: {
        type: [CartItem],
        default: [],
    },
});

if (!mongoose.modelNames().includes("User")) {
    mongoose.model<IUser>("User", schema);
}
