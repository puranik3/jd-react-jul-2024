import mongoose from "@/data/init";
import { IUserCartItem } from "@/types/user";

const User = mongoose.model("User");
const Product = mongoose.model("Product");

export const getCart = async (email: string) => {
    const data = await User.findOne({ email });

    const cart = data.cart;

    const productIds = cart.map(
        (cartItem: IUserCartItem) => cartItem.productId
    );

    const products = await Product.find({
        _id: {
            $in: productIds,
        },
    }).select("_id title price image");

    const returnedCart = data.cart.map((cartItem: IUserCartItem) => {
        const product = products.find(
            (p) => (p as any)._id.toString() === cartItem.productId
        );

        return {
            product: {
                _id: product._id?.toString() || "",
                title: product.title || "",
                price: product.price || "",
                image: product.image || "",
            },
            quantity: cartItem.quantity,
        };
    });

    return returnedCart;
};

export const updateCart = async (email: string, cart: IUserCartItem) => {
    const data = await User.findOneAndUpdate(
        { email },
        {
            cart: cart,
        },
        { new: true }
    );
    const dataJson = data.toJSON({ flattenObjectIds: true });
    delete dataJson.password;

    return dataJson.cart;
};
