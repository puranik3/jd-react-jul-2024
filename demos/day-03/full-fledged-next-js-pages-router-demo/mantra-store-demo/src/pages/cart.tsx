import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";

import Cart from "@/components/cart/cart";
import { ICartItem } from "@/types/cart";

import { getCart } from "@/data/services/cart";

type Props = {
    cart: ICartItem[];
};

export default function CartPage({ cart }: Props) {
    return (
        <>
            <Head>
                <title>Shopping cart | Mantra Store</title>
                <meta name="description" content="Shopping cart" />
            </Head>

            <Cart cart={cart} />
        </>
    );
}

// is called at request time - called for every HTTP request for this page
export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });

    if (!session || !session.user || !session.user.email) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    const email = session.user.email;

    const cart = await getCart(email);

    return {
        props: { cart },
    };
};