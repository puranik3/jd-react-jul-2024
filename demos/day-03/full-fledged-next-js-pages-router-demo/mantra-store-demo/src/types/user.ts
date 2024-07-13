export interface IUserCartItem {
    productId: string;
    quantity: number;
}

export interface IUser {
    email: string;
    username: string;
    password: string;
    role?: "customer" | "admin";
    cart?: IUserCartItem[];
}

export type IRegister = Pick<IUser, "email" | "username" | "password">;

export type ICredentials = Pick<IUser, "email" | "password">;

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}
