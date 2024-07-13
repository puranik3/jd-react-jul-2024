import { IChangePassword } from "@/types/user";
import axios from "axios";

type IRegisterResponse = {
    message: string;
};

export async function changePassword(passwordData: IChangePassword) {
    const response = await axios.patch<IRegisterResponse>(
        "/api/user/change-password",
        passwordData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}
