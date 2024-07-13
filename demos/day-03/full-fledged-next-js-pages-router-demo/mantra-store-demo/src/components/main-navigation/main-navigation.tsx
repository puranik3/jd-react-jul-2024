import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Link from "@/components/link/link";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

import Badge from "@mui/material/Badge";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/context/shopping-cart";
import { getCart } from "@/services/cart";
import { useEffect } from "react";

// menu items for authenticated and unauthenticated users
const authenticatedUserMenu = [
    {
        href: "/profile",
        text: "Profile",
    },
    {
        href: "/logout",
        text: "Logout",
    },
];

const unauthenticatedUserMenu = [
    {
        href: "/auth",
        text: "Login/Register",
    },
];

function ResponsiveAppBar() {
    // check if the user is authenticated
    const [session, loading] = useSession();

    // get the router object for programmatic navigation
    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    // Right menu state (similar to left menu_
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    // Right menu logic to run on opening (similar to left menu)
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Right menu logic to run on closing (similar to left menu)
    // If href is provided, navigate to the href
    const handleCloseUserMenu = async (href?: string) => {
        if (!href) {
            return setAnchorElUser(null);
        }

        if (href === "/logout") {
            await signOut();

            // bad fix for router.push() not working well in this case
            window.location.href = "/auth";
            return;
        }

        router.push(href);
    };

    // required values from the shopping cart context
    const { cart, setCart } = useCart();

    // Fetch the cart on page load, and every time user logs in (session value changes and is set)
    useEffect(() => {
        const fetchCart = async () => {
            const data = await getCart();
            console.log("fetchCart data in main-navigation = ", data);
            setCart(
                data.message.cart.map((item) => {
                    return {
                        productId: item.product._id,
                        quantity: item.quantity,
                    };
                })
            );
        };

        if (session) {
            fetchCart();
        }
    }, [session, setCart]);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                            letterSpacing: 0,
                        }}
                    >
                        <Link
                            href="/"
                            color="inherit"
                            sx={{
                                textDecoration: "none",
                                textTransform: "uppercase",
                            }}
                        >
                            Mantra
                        </Link>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link
                                        href="/products"
                                        color="inherit"
                                        sx={{ textDecoration: "none" }}
                                    >
                                        Products
                                    </Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link
                                        href="/products/add"
                                        color="inherit"
                                        sx={{ textDecoration: "none" }}
                                    >
                                        Add a Product
                                    </Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <Link
                            href="/"
                            color="inherit"
                            sx={{
                                textDecoration: "none",
                            }}
                        >
                            Mantra
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <Link
                                href="/products"
                                color="inherit"
                                sx={{ textDecoration: "none" }}
                            >
                                Products
                            </Link>
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <Link
                                href="/products/add"
                                color="inherit"
                                sx={{ textDecoration: "none" }}
                            >
                                Add a Product
                            </Link>
                        </Button>
                    </Box>

                    {session && !loading && (
                        <Badge
                            badgeContent={cart.length}
                            color="secondary"
                            sx={{
                                paddingRight: "-24px",
                                marginRight: "24px",
                                marginTop: "8px",
                            }}
                        >
                            <IconButton
                                aria-label="add to favorites"
                                sx={{ color: "white" }}
                                onClick={() => handleCloseUserMenu("/cart")}
                            >
                                <ShoppingCart />
                            </IconButton>
                        </Badge>
                    )}

                    {/* right menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={(
                                        session?.user?.email || ""
                                    ).toUpperCase()}
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => handleCloseUserMenu()}
                        >
                            {!session &&
                                unauthenticatedUserMenu.map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        onClick={() =>
                                            handleCloseUserMenu(item.href)
                                        }
                                    >
                                        <Typography textAlign="center">
                                            {item.text}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            {session &&
                                !loading &&
                                authenticatedUserMenu.map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        onClick={() =>
                                            handleCloseUserMenu(item.href)
                                        }
                                    >
                                        <Typography textAlign="center">
                                            {item.text}
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
