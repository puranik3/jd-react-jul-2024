import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { changePassword } from "@/services/user";
import { Box, Button, TextField } from "@mui/material";

function ProfileForm() {
    const router = useRouter();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await changePassword({ oldPassword, newPassword });

            setOldPassword("");
            setNewPassword("");
            alert("Password has been updated");
        } catch (error) {
            alert("Password has not been updated");
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession({}).then((session) => {
            if (!session) {
                // window.location.href = "/auth";
                router.push("/auth");
            } else {
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: 4,
                }}
            >
                Loading...
            </Box>
        );
    }

    return (
        <section>
            <h1>Change Password</h1>
            <form onSubmit={submitHandler}>
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        label="Old Password"
                        value={oldPassword}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setOldPassword(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        value={newPassword}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setNewPassword(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <Button variant="outlined" type="submit">
                        Change password
                    </Button>
                </Box>
            </form>
        </section>
    );
}

export default ProfileForm;
