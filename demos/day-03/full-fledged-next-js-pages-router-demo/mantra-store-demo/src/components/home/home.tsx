import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Grid } from "@mui/material";
import Image from "next/image";

export default function Home() {
    return (
        <Grid
            container
            spacing={2}
            rowSpacing={1}
            columnSpacing={{ xs: 5, sm: 6, md: 7 }}
        >
            <Grid item md={12} lg={6}>
                <ImageList sx={{ width: "100%" }} cols={3} rowHeight={168}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <Image
                                src={item.img}
                                width={168}
                                height={168}
                                alt={item.title}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid item md={12} lg={6}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Mantra Store
                </Typography>
                <Typography variant="h6" sx={{ mb: 5 }}>
                    The Honest Store
                </Typography>
                <Typography variant="body1">
                    If you cannot find what you are looking for here, it is
                    likely not a thing! If you find it elsewhere at a lesser
                    price, we will match the price for you!!
                </Typography>
            </Grid>
        </Grid>
    );
}

const itemData = [
    {
        img: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    },
    {
        img: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
    },
    {
        img: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        title: "White Gold Plated Princess",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
    },
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
    },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
    },
    {
        img: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    },
    {
        img: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    },
    {
        img: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
        title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    },
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
    },
];
