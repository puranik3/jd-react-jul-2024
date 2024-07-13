import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Link from "@/components/link/link";

import { IProduct } from "@/types/product";

import { useCart } from "@/context/shopping-cart";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

import classes from "./item.module.scss";

type Props = {
    product: IProduct;
};

const getBgColor = (category: IProduct["category"]) => {
    const categoryBgColorMap = {
        "men's clothing": "olive",
        "women's clothing": "blue",
        jewelery: "goldenrod",
        electronics: "gray",
    };

    return categoryBgColorMap[category];
};

const ProductListItem = ({ product }: Props) => {
    const { changeQuantity } = useCart();

    // get session information using getSession(), and maintain the data in state
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        getSession({}).then((session) => {
            if (session) {
                setSession(session);
            }

            setLoading(false);
        });
    }, []);

    return (
        <Card
            sx={{ alignItems: "stretch", minWidth: "100%" }}
            className={classes.category__container}
        >
            <div
                style={{ backgroundColor: getBgColor(product.category) }}
                className={classes.category}
            >
                {product.category}
            </div>
            <CardMedia
                component="img"
                height="194"
                image={product.image}
                alt={product.title}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {product.title}
                </Typography>
                <Box
                    title={product.rating.rate.toFixed(2)}
                    sx={{ display: "flex", mt: 3, mb: 3 }}
                >
                    <Rating defaultValue={product.rating.rate} readOnly /> (
                    {product.rating.count} people rated)
                </Box>
                <Typography variant="body2" color="text.secondary">
                    <strong>Price</strong>
                    {": "}${product.price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {/* Add a shopping cart icon to add the product to the cart if session exists (user is logged in) */}
                {session && !loading && (
                    <IconButton aria-label="add to cart">
                        <ShoppingCart
                            onClick={() => changeQuantity(product._id, 1)}
                        />
                    </IconButton>
                )}
                <Button
                    size="small"
                    component={Link}
                    href={`/products/${product._id}`}
                >
                    KNOW MORE
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductListItem;
