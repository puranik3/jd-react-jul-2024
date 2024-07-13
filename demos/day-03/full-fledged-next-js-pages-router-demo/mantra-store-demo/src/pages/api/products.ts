import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/types/product";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { getProducts } from "@/data/services/products";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<
        | IApiResponse<
              IProduct | { count: number; page: number; products: IProduct[] }
          >
        | IErrorMessage
    >
) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const page = req.query.page ? +req.query.page : 1;
                const {
                    count,
                    page: inferredPage,
                    products,
                } = await getProducts(page);
                return res.status(200).json({
                    status: "success",
                    message: {
                        count,
                        page: inferredPage,
                        products,
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
