import { IProduct } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

import ProductReviews from "./product-reviews/product-reviews";
import AddReview from "./add-review/add-review";

type Props = {
    productId: string | undefined;
    product: IProduct;
};

const ProductDetail = ({ productId, product }: Props) => {
    const router = useRouter();

    const _idRouter = router.query._id as string[];

    if (!_idRouter) {
        return <div>Loading...</div>;
    }

    let el;

    if (_idRouter[1] === undefined) {
        el = <ProductReviews reviews={product.reviews} />;
    } else if (_idRouter[1] !== "addreview") {
        el = <div>Something went wrong</div>;
    } else {
        el = <AddReview productId={productId} />;
    }

    return (
        <div>
            <Paper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <Box sx={{ padding: "24px" }}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={320}
                                height={240}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Typography variant="h4" component="h1">
                            {product.title}
                        </Typography>
                        <Box
                            title={product.rating.rate.toFixed(2)}
                            sx={{ display: "flex", mt: 3, mb: 3 }}
                        >
                            <Rating
                                defaultValue={product.rating.rate}
                                readOnly
                            />{" "}
                            ({product.rating.count} people rated)
                        </Box>
                        <Typography variant="body1">
                            <strong>Price</strong>: ${product.price}
                        </Typography>
                        <Typography variant="body1">
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ mt: 3 }}>{el}</Box>
        </div>
    );
};

export default ProductDetail;
