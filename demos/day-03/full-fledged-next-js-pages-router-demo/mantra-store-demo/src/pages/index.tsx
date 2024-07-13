import Head from "next/head";
import Home from "@/components/home/home";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Mantra Store</title>
                <meta
                    name="description"
                    content="Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep."
                />
            </Head>

            <Home />
        </>
    );
}
