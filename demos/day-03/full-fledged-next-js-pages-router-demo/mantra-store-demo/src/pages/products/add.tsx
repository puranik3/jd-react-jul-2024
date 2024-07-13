import Head from "next/head";
import AddProduct from "@/components/add-product/add-product";

export default function AddProductPage() {
    return (
        <>
            <Head>
                <title>Add a product</title>
                <meta
                    name="description"
                    content="Add a new product to the store."
                />
            </Head>

            <AddProduct />
        </>
    );
}
