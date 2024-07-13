import mongoose from "@/data/init";
import { IUser } from "@/types/user";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

export const register = async (user: IUser) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        user.password = hashedPassword;

        const registeredUser = await User.create(user);
        const serializedUser = registeredUser.toJSON({
            flattenObjectIds: true,
        });

        delete serializedUser.password;
        delete serializedUser.cart;

        return serializedUser;
    } catch (error) {
        if ((error as any).code === 11000) {
            throw new Error("User already exists");
        }

        throw error;
    }
};
