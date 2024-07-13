import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/types/product";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { createReview } from "@/data/services/reviews";
import { getSession } from "next-auth/client";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<IProduct> | IErrorMessage>
) => {
    const { method } = req;

    switch (method) {
        case "POST":
            const session = await getSession({ req: req });

            if (!session) {
                res.status(401).json({
                    status: "error",
                    message: "Not authenticated!",
                });
                return;
            }

            try {
                let _id = req.query._id as string;
                const review = req.body;

                console.log("review = ", review);

                review.username = session.user?.email;
                review.date = new Date().toISOString();

                const reviews = await createReview(_id, review);

                console.log("reviews = ", reviews);

                return res.status(201).json({
                    status: "success",
                    message: reviews,
                });
            } catch (error) {
                console.log("POST /review error = ", error);
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
