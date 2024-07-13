import { useState } from "react";
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import { postReview } from "@/services/reviews";

type Props = {
    productId: string | undefined;
};

const AddReview = ({ productId }: Props) => {
    const router = useRouter();
    const _id = (router.query._id as string[])[0]; // [ product, 'addreview' ]
    // console.log("_id = ", _id);

    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");

    const handleRatingChange = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: number | null
    ) => {
        setRating(newValue || 0);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleAddReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (productId) {
                const reviews = await postReview(_id, {
                    rating,
                    text,
                });
                router.push(`/products/${_id}`);
            }
        } catch (error) {
            alert(`Failed to add review: ${(error as Error).message}`);
        }
    };

    return (
        <Box>
            <Typography variant="h6" component="h2">
                Add a review
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleAddReview}>
                <div>
                    <Rating value={rating} onChange={handleRatingChange} />
                </div>
                <div>
                    <TextField
                        multiline
                        maxRows={4}
                        value={text}
                        onChange={handleTextChange}
                    />
                </div>
                <div>
                    <Button type="submit">Add review</Button>
                </div>
            </form>
        </Box>
    );
};

export default AddReview;
