import { useState, useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableFooter,
    IconButton,
    Button,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { useCart } from "@/context/shopping-cart";

import { ICartItem } from "@/types/cart";
import { IProduct } from "@/types/product";
import { getCart } from "@/services/cart";

type Props = {
    cart: ICartItem[];
};

function Cart({ cart }: Props) {
    const { changeQuantity } = useCart();

    if (!cart || cart.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: 4,
                }}
            >
                Cart is empty
            </Box>
        );
    }

    const total = cart.reduce(
        (acc, item) => acc + (item.product as IProduct).price * item.quantity,
        0
    );
    console.log("cart = ", cart);

    return (
        <section>
            <h1>Shopping cart</h1>
            <Divider sx={{ my: 3 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Shopping cart">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">S. No.</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price ($)</TableCell>
                            <TableCell align="right">Total Price ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map(({ product, quantity }: any, idx: number) => (
                            <TableRow
                                key={product._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {idx + 1}
                                </TableCell>
                                <TableCell>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={48}
                                        height={48}
                                    />
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="decrease quantity"
                                        size="small"
                                        sx={{
                                            mr: 1,
                                        }}
                                        onClick={async () => {
                                            const data = await changeQuantity(
                                                product._id,
                                                -1
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        <Remove
                                            color="success"
                                            fontSize="small"
                                        />
                                    </IconButton>
                                    {quantity}
                                    <IconButton
                                        aria-label="increase quantity"
                                        size="small"
                                        sx={{
                                            mx: 1,
                                        }}
                                        onClick={async () => {
                                            const data = await changeQuantity(
                                                product._id,
                                                1
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        <Add color="success" fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    {product.price.toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    {(quantity * product.price).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} />
                            <TableCell align="right" sx={{ fontSize: "1em" }}>
                                Total
                            </TableCell>
                            <TableCell align="right" sx={{ fontSize: "1em" }}>
                                {total.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </section>
    );
}

export default Cart;
