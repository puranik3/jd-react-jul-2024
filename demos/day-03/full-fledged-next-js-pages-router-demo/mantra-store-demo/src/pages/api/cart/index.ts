import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { getCart, updateCart } from "@/data/services/cart";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method } = req;

    const session = await getSession({ req: req });

    if (!session || !session.user) {
        res.status(401).json({ message: "Not authenticated!" });
        return;
    }

    const email = session.user.email as string;

    switch (method) {
        case "GET":
            try {
                const cart = await getCart(email);
                return res.status(200).json({
                    status: "success",
                    message: {
                        cart,
                    },
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        case "PUT":
            const cart = req.body;

            try {
                const updatedCart = await updateCart(email, cart);
                return res.status(200).json({
                    status: "success",
                    message: {
                        cart: updatedCart,
                    },
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        default:
            return res.status(405).json({
                status: "error",
                message: `METHOD=${method} not allowed`,
            });
    }
};

export default handler;
