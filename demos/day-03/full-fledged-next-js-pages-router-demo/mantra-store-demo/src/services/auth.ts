import { ICredentials, IRegister } from "@/types/user";
import axios from "axios";

type IRegisterResponse = {
    status: "success" | "error";
    message: {
        email: string;
        role: "customer" | "admin";
    };
};

export const register = async (credentials: IRegister) => {
    const response = await axios.post<IRegisterResponse>(
        `/api/auth/register`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
