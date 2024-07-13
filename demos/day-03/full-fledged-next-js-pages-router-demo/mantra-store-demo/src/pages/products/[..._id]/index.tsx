import Head from "next/head";
import { GetStaticPropsContext } from "next";

import ProductDetail from "@/components/product-detail/product-detail";
import { getProductById, getProductsIds } from "@/data/services/products";
import { IProduct } from "@/types/product";

type Props = {
    _id: string;
    product: IProduct;
};

const ProductDetailPage = ({ _id, product }: Props) => {
    return (
        <>
            <Head>
                <title>{product?.title || "Product details"}</title>
                <meta name="description" content={product?.description || ""} />
            </Head>
            <ProductDetail productId={_id} product={product} />
        </>
    );
};

// type of _id is string[] because of the "catch all" dynamic route [..._id]
export const getStaticProps = async (
    context: GetStaticPropsContext<{ _id: string[] }>
) => {
    const { params } = context;
    const _id = params?._id as string[]; // an array of strings

    return {
        props: {
            _id: _id,
            product: await getProductById(_id[0]), // extract the first param which is the product id
        },
        revalidate: 60,
    };
};

// ...component code, getStaticProps() code

// {
//     paths : {
//         params: {
//             id: [ 1234, 2345, 3456 ],
//         }

//     }
// }
// fallback: false -> if the product id does not exist in this returned paths, it will return 404 (such a product does not exist)
// fallback: true -> if the product id does not exist in this returned paths, it will still try to render the page
export const getStaticPaths = async () => {
    const _ids = await getProductsIds();
    return {
        paths: _ids.map((_id) => {
            return {
                // returns an array of paths with params
                params: { _id: [_id] },
            };
        }),
        fallback: true,
    };
};

export default ProductDetailPage;
