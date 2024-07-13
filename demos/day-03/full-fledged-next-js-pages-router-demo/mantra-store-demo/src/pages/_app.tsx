import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/layout/layout";

import { useState } from "react";
import { CartProvider } from "@/context/shopping-cart";
import { updateCart } from "@/services/cart";

import theme from "../styles/theme";

function App(props: AppProps) {
    const { Component, pageProps } = props;

    const [cart, setCart] = useState<any>([]);

    const changeQuantity = async (
        productId: string | undefined,
        quantityToAdd: number
    ) => {
        if (!productId) {
            return;
        }

        let newCart = [...cart];

        const index = newCart.findIndex((item) => item.productId === productId);

        if (index >= 0) {
            newCart[index] = {
                ...newCart[index],
                quantity: newCart[index].quantity + quantityToAdd,
            };
        } else {
            newCart.push({ productId: productId, quantity: quantityToAdd });
        }

        newCart = newCart.filter((item) => item.quantity > 0);

        const cartToSend = newCart.map((item) => {
            return {
                productId: item.product ? item.product._id : item.productId,
                quantity: item.quantity,
            };
        });

        const response = await updateCart(cartToSend);

        const updatedCart = response.message.cart;

        setCart(updatedCart);

        return updatedCart;
    };

    const value = {
        cart,
        changeQuantity,
        setCart,
    };

    return (
        <AppCacheProvider {...props}>
            <CartProvider value={value}>
                <Layout>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </Layout>
            </CartProvider>
        </AppCacheProvider>
    );
}

export default App;
