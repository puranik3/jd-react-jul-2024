import mongoose from "@/data/init";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";
import { ICredentials } from "@/types/user";

const User = mongoose.model("User");

console.log("User", User);

export default NextAuth({
    session: {
        jwt: true,
        maxAge: 60 * 60 * 24 * 30,
    },
    providers: [
        Providers.Credentials({
            async authorize({ email, password }: ICredentials) {
                // find user by email
                const user = await User.findOne({ email });

                // if user not found, throw error
                if (!user) {
                    throw new Error("User not found");
                }

                // compare login password and user's actual (hashed) password
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                // if password is invalid, throw error
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // return user's claims (for some reason, the claims does not accept extra parameters like username and role)
                const claims = {
                    email: user.email,
                    username: user.username,
                    role: user.role,
                };

                return claims;
            },
        }),
    ],
});
