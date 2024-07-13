import mongoose from "@/data/init";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: "Not authenticated!" });
        return;
    }

    const email = session.user?.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            res.status(403).json({ message: "Invalid password!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred!" });
    }
}

export default handler;