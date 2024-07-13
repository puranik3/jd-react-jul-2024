import Head from "next/head";

import AuthForm from "@/components/auth/auth-form";

export default function AuthPage() {
    return (
        <>
            <Head>
                <title>Login/Register | Mantra Store</title>
                <meta
                    name="description"
                    content="Login / Register with Mantra Store"
                />
            </Head>

            <AuthForm />
        </>
    );
}
