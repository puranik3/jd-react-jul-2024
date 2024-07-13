import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ProductListItem from "./item/item";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

import { getProducts } from "@/services/products";

import { IProduct } from "@/types/product";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

const ProductsList = ({ products, count, page }: Props) => {
    // actual values are stored in the state (these are updated when different pages are selected in the pagination widget)
    const [actualPage, setActualPage] = useState(page);
    const [actualCount, setActualCount] = useState(count);
    const [actualProducts, setActualProducts] = useState(products);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // controls the Snackbar display
    const [open, setOpen] = useState(false);

    // the closeSnackbar and action code is taken from the MUI documentation on Snackbar
    const closeSnackbar = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={closeSnackbar}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // fetch products when page number (actualPage controlled via the pagination widget) changes
    useEffect(() => {
        const helper = async () => {
            try {
                setLoading(true);

                const {
                    message: { page, count, products },
                } = await getProducts(actualPage);
                setActualCount(count);
                setActualProducts(products);
            } catch (error) {
                setError(error as Error);

                // open the snackbar with the error message
                setOpen(true);
            } finally {
                setLoading(false);
            }
        };

        helper();
    }, [actualPage]);

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                List of products
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* pagination widget */}
            <Pagination
                count={Math.round(actualCount / 10)}
                page={actualPage}
                onChange={(event: React.ChangeEvent<any>, page: number) =>
                    setActualPage(page)
                }
                sx={{ mt: 3, mb: 3 }}
            />

            {/* display a loading spinner when fetching data */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            )}

            {/* display the error message in a Snackbar */}
            {!loading && error && (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={closeSnackbar}
                    message={error.message}
                    action={action}
                />
            )}

            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {actualProducts.map((product) => (
                    <Grid
                        item
                        key={product._id}
                        xs={3}
                        sx={{
                            display: "flex",
                            alignItems: "stretch",
                            mb: 2,
                        }}
                    >
                        <ProductListItem product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductsList;
