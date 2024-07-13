import Head from "next/head";
import ProductsList from "@/components/products-list/products-list";
import { getProducts } from "@/data/services/products";
import { IProduct } from "@/types/product";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

export default function ProductsListPage({ count, page, products }: Props) {
    return (
        <>
            <Head>
                <title>List of products</title>
                <meta
                    name="description"
                    content="Search through products and add them to your cart."
                />
            </Head>

            <ProductsList products={products} count={count} page={page} />
        </>
    );
}

// runs at build-time
export async function getStaticProps() {
    const { count, page, products } = await getProducts();

    return {
        props: {
            products,
            count,
            page,
        },
    };
}
