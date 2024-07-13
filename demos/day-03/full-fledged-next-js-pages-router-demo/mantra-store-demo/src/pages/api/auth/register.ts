import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/types/user";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { register } from "@/data/services/auth";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<IUser> | IErrorMessage>
) => {
    const { method } = req;

    switch (method) {
        case "POST":
            const user = req.body;

            try {
                const registeredUser = await register(user);
                return res.status(201).json({
                    status: "success",
                    message: registeredUser,
                });
            } catch (error) {
                // Ideally - please check error.name and send appropriate HTTP error codes and responses
                // error.name === 'CastError' || error.name === 'ValidationError'

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
