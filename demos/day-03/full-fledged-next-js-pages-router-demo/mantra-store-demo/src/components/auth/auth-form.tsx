import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { register } from "@/services/auth";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";

function AuthForm() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // registration
            if (!isLogin) {
                await register({ email, username, password });
                alert(username + " registered successfully");
                setIsLogin(true);
                return;
            }

            // login
            if (isLogin) {
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });

                if (result && result.error === null) {
                    router.push("/products");
                } else {
                    alert("Login failed");
                }
            }
        } catch (error) {
            alert((error as Error).message);
        }
    }

    // prevent navigation to this page if session exists
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession({}).then((session) => {
            if (session) {
                // bad but a temporray fix for router.push() giving problems
                window.location.href = "/profile";
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
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin && (
                    <Box sx={{ my: 2 }}>
                        <TextField
                            required
                            type="text"
                            id="username"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(event.target.value)}
                            sx={{ width: "600px", maxWidth: "100%" }}
                        />
                    </Box>
                )}
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setEmail(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setPassword(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <Button variant="outlined" type="submit">
                        {isLogin ? "Login" : "Create Account"}
                    </Button>
                    <Box sx={{ my: 2 }}>
                        <Button
                            type="button"
                            variant="text"
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin
                                ? "Create new account"
                                : "Login with existing account"}
                        </Button>
                    </Box>
                </Box>
            </form>
        </section>
    );
}

export default AuthForm;
