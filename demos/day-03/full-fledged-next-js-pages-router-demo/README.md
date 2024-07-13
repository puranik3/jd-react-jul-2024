# Building Mantra Store - A Next JS app

Building Mantra Store (an online store) using the Pages Router

-   Using TypeScript
-   Using Material UI
-   Using Module Sass files for styling

## Pre-requisites

-   Good knowledge of React
-   Working knowledge of Node JS

## Software

-   Node JS installed (preferably v20) - https://nodejs.org

## References

-   Choose the Pages Router from the dropdown in the official Next JS documentation - https://nextjs.org/docs/getting-started/installation
-   MUI Core documentation - https://mui.com/material-ui/getting-started/
    -   Do check out other packages from MUI - https://mui.com/

## Step 1: Creating the app

-   Open the terminal folder where you would like your project to be created.
-   Run

```
npx create-next-app mantra-store
```

If you find issues with the Node JS version, you may use an older version of create-next-app

```
npx create-next-app@13 mantra-store
```

-   Answer the questions asked like so

```
Need to install the following packages:
create-next-app@14.2.1
Ok to proceed? (y) y
? Would you like to use TypeScript? › No / Yes - Select Yes
? Would you like to use ESLint? › No / Yes - Select Yes
? Would you like to use Tailwind CSS? › No / Yes - Select No
? Would you like to use `src/` directory? › No / Yes - Select Yes
? Would you like to use App Router? (recommended) › No / Yes - Select No
? Would you like to customize the default import alias (@/*)? › No / Yes - Select No
```

-   Your project would be created in a few moments. You will find the mantra-store folder. Navigate to the folder from within the terminal.

```
cd mantra-store
```

## Step 2: Understanding the project structure

-   The instructor shall explain the files and folders. Make sure to understand the purpose of each file and folder.
-   The project has the application code in `src/` folder beacuse we chose so at project creation time (else it will not have the folder).
-   Since we are using the Pages router, the page components shall go within the `pages/` folder (for the more recent App router, the page files would be within the `app/` folder). This is one way to know which router you are working with - Pages or App router.

## Step 3: Running the development server

-   Launch the dev server by running the `dev` script

```
npm run dev
```

-   It launches on port 3000 by default. Open http://localhost:3000 in the browser - you see the page which is essentially src/pages/index.tsx

## Step 4: Organizing files

Add the following folders to the src/ folder. This is of course only a guidance. In an application you build at work or for pleasure, you are free to organzie as you please. **But for this project please follow this structure only**.

-   **components/** - Houses the components that are not pages
-   **context/** - Houses the context objects used for sharing data across the app
-   **data/** - Houses the code for connecting to the backend, defining models, and DB services (methods with DB queries that shall be shared across the app)
-   **pages/** - already exists - it houses the page-level components
-   **services/** - Houses the API methods called by client-side code (like making API calls to fetch data, post data etc.)
-   **styles/** - already exists - it houses the global styles
-   **types/** - Houses the TS types (interfaces, types, classes etc.) we shall define

**Tip**:
Going forward, make note of each one's purpose. Next JS being a full-stack React + Node JS app will have both frontend and backend files. Carefully make note of which files / functions execute

-   exclusively on the client
-   exclusively on the server
-   exclusively at build time (or regenerated through a periodically running process)
-   at various places (client and server)

Making this distinction will help you to understand Next JS easily.

## Step 5: Setting up the Home page

-   `src/components/home/home.tsx` - Create a basic UI for the home page - We shall define the actual UI for every page in a component in the components/ folder. Thus we frst create this component first. Note that we shall be creating a folder for each component. Again emphasizing - you are free to organize folders as you like, **but please stick to this organization for this project**.

```js
export default function Home() {
    return <div>Home component</div>;
}
```

-   `src/pages/index.tsx` - Edit the HomePage

```tsx
import Home from "@/components/home/home";

export default function HomePage() {
    return (
        <>
            <Home />
        </>
    );
}
```

-   `src/styles/Home.module.css` - You can remove this as this was used in the original home page, and we don't need it now.

## Step 6: Adding metadata

-   `src/pages/index.tsx` - Edit the HomePage to add metadata for a page like so. You shall use the Head component in future for any page you create and set appropriate metadata

```tsx
import Head from "next/head";

import Home from "@/components/home";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Mantra Store</title>
                <meta
                    name="description"
                    content="Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep."
                />
            </Head>

            <Home />
        </>
    );
}
```

## Step 7: Setting up Material UI

**Tip**: For library (third-party node module) installations, either open a new terminal in the mantra-store folder, or if you stop the one running the dev server, make sure to start it again after the installation.

-   From a terminal opened at the project folder run

```
npm i @mui/material @mui/icons-material @mui/material-nextjs @emotion/cache @emotion/react @emotion/server @emotion/styled
```

_Note_: MUI uses Emotion for styling

-   Your package.json should be updated like so. Minro version mismatches are ok. But if the major version is different consult with the instructor.

```json
"dependencies": {
    "@emotion/cache": "^11.11.0",
    "@emotion/react": "^11.11.4",
    "@emotion/server": "^11.11.0",
    "@emotion/styled": "^11.11.5",
    "@mui/icons-material": "^5.15.15",
    "@mui/material": "^5.15.15",
    "@mui/material-nextjs": "^5.15.11",
    ...
}
```

-   `styles/theme.ts` - Set up the theme for your app like so. Understand the various pieces in the code (Setting up theme color palette, font, typography). Understand the optimizations Next JS does with respect to fonts.
-   https://nextjs.org/docs/pages/building-your-application/optimizing/fonts

```ts
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;
```

-   `src/pages/_app.tsx` - Set up the theme for the application like so.
    -   `CssBaseline` provides a normalize CSS so that broswer inconsistencies are overcome.
    -   `AppCacheProvider` optimizes performance by caching styles and assets. It helps to reduce the amount of work required to render Material-UI components on subsequent page loads. This can lead to faster rendering times and improved overall performance for your Next.js application. It also leads to reduction in bundle size.

```tsx
import Head from "next/head";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";

import "@/styles/globals.css";

function App(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <AppCacheProvider {...props}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </AppCacheProvider>
    );
}

export default App;
```

-   As a good practice we shall also set up the following metadata / head elements. This is merged with the Page component Head element, and unless overriden by the page, shall be applied to the page

```tsx
<AppCacheProvider {...props}>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
</AppCacheProvider>
```

-   `src/styles/global.css` and `src/pages/_app.tsx` - You can add any global CSS classes / styles in it. In a general app, this can be useful. However in this app we use none of those styles and the file can safely be deleted, and its import in \_app.tsx removed. This step is optional, and not doing this will have no effect on the styling of our app as well.

## Step 8: Creating a layout for the app as a whole

-   Our app requires a main navigation menu for every page. We create the `MainNavigation` component first, and then a custom `Layout` component
-   `src/components/main-navigation/main-navigation.tsx` - Add the following. This UI is more or less the example taken from one of the examples in the MUI documentation.

```tsx
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
import Link from "@mui/material/Link";

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
```

-   Add the following in `src/components/layout/layout.tsx`

```tsx
import { Fragment, ReactNode } from "react";
import { Container } from "@mui/material";

import MainNavigation from "@/components/main-navigation/main-navigation";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return (
        <Fragment>
            <MainNavigation />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <main>{children}</main>
            </Container>
        </Fragment>
    );
}

export default Layout;
```

-   `src/pages/_app.tsx` - Now wrap the page rendering within Layout

```tsx
// some imports above...
import Layout from "@/components/layout/layout";

function App(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <AppCacheProvider {...props}>
            <Layout>
                <Head>{/*...*/}</Head>
                <ThemeProvider theme={theme}>{/*...*/}</ThemeProvider>
            </Layout>
        </AppCacheProvider>
    );
}

export default App;
```

## Step 9: Set up pages and components for /products and /products/add

-   Go ahead and set up page components and their corresponding components (ProductsList and AddProduct) for the 2 routes - /products and /products/add
-   This is left as an exercise. Make sure to set up appropriate metadata as well for the pages.
-   Confirm your implementation with the instructor

## Step 10: Using a custom Link that combines Link from `next/link` and `@mui/material/Link`

-   You should now see the pages appear with the main navigation. The Material UI Link component however causes page refresh (call to server goes out every time the Link is clicked). Next JS provides a Link component, but this is not amenable to Material UI styling. To get over these problems, Material UI examples for Next JS provides a Link component that renders the Next Link component, yet enables styling by rendering within a Material UI Link.
-   References: https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-pages-router-ts/src/Link.tsx
-   For Next JS project examples with various other libraries check - https://mui.com/material-ui/getting-started/example-projects/
-   `src/components/link/link.tsx` - Create this component

```tsx
import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
        Omit<
            NextLinkProps,
            | "href"
            | "as"
            | "passHref"
            | "onMouseEnter"
            | "onClick"
            | "onTouchStart"
        > {
    to: NextLinkProps["href"];
    linkAs?: NextLinkProps["as"];
}

export const NextLinkComposed = React.forwardRef<
    HTMLAnchorElement,
    NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
    const {
        to,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior = true,
        locale,
        ...other
    } = props;

    return (
        <NextLink
            href={to}
            prefetch={prefetch}
            as={linkAs}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref
            locale={locale}
            legacyBehavior={legacyBehavior}
        >
            <Anchor ref={ref} {...other} />
        </NextLink>
    );
});

export type LinkProps = {
    activeClassName?: string;
    as?: NextLinkProps["as"];
    href: NextLinkProps["href"];
    linkAs?: NextLinkProps["as"]; // Useful when the as prop is shallow by styled().
    noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
    Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    props,
    ref
) {
    const {
        activeClassName = "active",
        as,
        className: classNameProps,
        href,
        legacyBehavior,
        linkAs: linkAsProp,
        locale,
        noLinkStyle,
        prefetch,
        replace,
        role, // Link don't have roles.
        scroll,
        shallow,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName,
    });

    const linkAs = linkAsProp || as;
    const nextjsProps = {
        to: href,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior,
        locale,
    };

    if (noLinkStyle) {
        return (
            <NextLinkComposed
                className={className}
                ref={ref}
                {...nextjsProps}
                {...other}
            />
        );
    }

    return (
        <MuiLink
            component={NextLinkComposed}
            className={className}
            ref={ref}
            {...nextjsProps}
            {...other}
        />
    );
});

export default Link;
```

-   `src/components/main-navigation/main-navigation` - Substitute the Material UI Link with this new link

```tsx
// ...some import above
// import Link from "@mui/material/Link";
import Link from "@/components/link/link";
```

-   With this change, the styling will still apply, and the page navigations will not cause a page refresh (i.e. no requests to server). The app is truly a Single Page Application (SPA).

## Step 11: A decent Home component

-   This UI is more or less taken from the one of the examples for ImageList in the MUI documentation. This is combined with a Grid layout.
-   `src/components/home/home.tsx` - Modify like so...
-   Understand the Grid, ImageList and their props.

```tsx
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

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
                            <img src={item.img} alt={item.title} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid item md={12} lg={6}>
                Mantra Store
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
```

-   Use Typography component to set text with different font sizes

```tsx
<Grid item md={12} lg={6}>
    <Typography variant="h4" sx={{ mb: 1 }}>
        Mantra Store
    </Typography>
    <Typography variant="h6" sx={{ mb: 5 }}>
        The Honest Store
    </Typography>
    <Typography variant="body1">
        If you cannot find what you are looking for here, it is likely not a
        thing! If you find it elsewhere at a lesser price, we will match the
        price for you!!
    </Typography>
</Grid>
```

## Step 12: The Image component of Next JS

-   When working with images we use the Image component provided by Next JS. It enables many optimizations (resizing images as per width and height props, preventing layout shifts, serving image in optimized image format based on browser, lazy loading of images etc.)
-   Read more about it here - https://nextjs.org/docs/pages/building-your-application/optimizing/images
-   `src/components/home/home.tsx` - Substitute the img element with Image

```tsx
import Image from "next/image";
```

```tsx
<ImageListItem key={item.img}>
    <Image src={item.img} width={168} height={168} alt={item.title} />
</ImageListItem>
```

-   `next.config.mjs`- You also need to add the following to support images from xternal domains

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["fakestoreapi.com", "images.unsplash.com"],
    },
};

export default nextConfig;
```

-   Observe the difference in look. Apart from this all optimizations are enabled.

## Step 12: Understanding Rendering models - mainly SSG

-   Next JS is a full-stack app. We write server-side code along with client-side code. This allows us to fetch data, and serve components that are rendered on the server-side. This rendering can happen mainly
    -   at build-time - this is called Static Site Generation (SSG)
    -   at request time - this is called Server-Side Rendering (SSR)
-   In fact SSG is the default rendering for Next JS pages!
-   Right click the Home page and "View page source" -> you will find rendered HTML coming from the server rather than an empty `<div id="root"></div>` like in regular client-side only React apps (like the one created using create-react-app)
-   Form the terminal run

```
npm run build
```

-   This creates the production build. You will see the type of rendering model applied to the pages. You will see that all pages are rendered using SSG!
-   Open the `.next` folder.
    -   Under `.next/server/pages` you will find the SSG pages
-   Apart from this Next JS code-splits content of every page, i.e. it creates a chunk JS for every page (this is to improve initial page load time in your SPA).
-   For statically generated pages, Next.js serves pre-rendered HTML files by default.
-   When navigating between statically generated pages using client-side routing, Next.js uses client-side JavaScript to handle the navigation and loads necessary JavaScript chunks for the new page while still using the pre-rendered HTML content. It hydrates the existing static HTML content with the client-side JavaScript, allowing for interactive behavior without a full server round-trip.
    -   These chunks can be found in the `.next/static/chunks/pages` folder.

## Step 13: Product List page - Setting up server-side code to connect to the DB and fetch products data, to render it using SSG

-   For the product list page to be rendered using at build time (SSG), we need to be able to fetch data from the DB - i.e. we need to set up the server-side logic that connects to the DB, and queries the DB.
-   `.env` - Set up DB related variables. Some of these environment variables would probably not be used, and may be deleted - we will mainly use DATABASE_CONNECTION_STRING.

```
NODE_ENV=production
DATABASE_HOST=cluster0.duet2eg.mongodb.net
DATABASE_PORT=27017
DATABASE_NAME=mantra
DATABASE_USER=puranik
DATABASE_PASSWORD=Mantra123$
DATABASE_CONNECTION_STRING=mongodb+srv://puranik:Mantra123$@cluster0.duet2eg.mongodb.net/mantra?retryWrites=true&w=majority&appName=Cluster0
```

-   `src/data/init.ts` - Set up the database connection.
-   Install mongoose. This is an alternative to using the MongoDB official driver for Node JS - MongoClient. It is an ODM (like ORM for RDBMS) and provides model validation, mapping based on relationships between collections etc.
-

```ts
import mongoose from "mongoose";

export const connect = async () => {
    const connectionStr =
        process.env.DATABASE_CONNECTION_STRING ||
        "mongodb://localhost:27017/mantra";

    try {
        await mongoose.connect(connectionStr);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }
};

export const disconnect = async () => {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
};

connect();

export default mongoose;
```

-   **Pitfall**: Note that destructuring does not work on environment variables (`process.env` object) in Next JS
    -   https://nextjs.org/docs/pages/api-reference/next-config-js/env
-   Ideally we need more conditional checks to connect to different DB environments based on development/production etc. This code is simplistic.

## Step 14: Define Product model

-   Set up a `src/data/models/` folder - This houses the DB collection schema for validation, and creates the models (used for querying the collections).
-   When working with TypeScript in Mongoose, we need to also create TypeScript types that parallel the schema definitions. These types we shall create in the `src/types/` folder.
-   Understand how the schema is setup, and how the model is created from the schema.
-   For more information on using Mongoose check - https://mongoosejs.com/docs/guide.html
-   `src/data/models/Product.ts`

```ts
import mongoose from "mongoose";
import { IProduct, IReview } from "@/types/product";

export const Review = new mongoose.Schema<IReview>({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        required: true,
        minlength: 20,
    },
});

export const schema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value: any) {
                return typeof value === "number";
            },
            message: "price must be a number.",
        },
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["men's clothing", "women's clothing", "jewelery", "electronics"],
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        // required: true,
        rate: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        count: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    reviews: {
        type: [Review],
        default: [],
    },
});

if (!mongoose.modelNames().includes("Product")) {
    mongoose.model<IProduct>("Product", schema);
}
```

-   `src/types/Product.ts`

```ts
export interface IReview {
    _id?: string;
    username: string;
    rating: number;
    date: Date | string;
    text: string;
}

export interface IProduct {
    _id?: string;
    title: string;
    price: number;
    description: string;
    category:
        | "men's clothing"
        | "women's clothing"
        | "jewelery"
        | "electronics";
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    reviews: IReview[];
}
```

-   The model will be created only if the models/Product.ts file runs. We make sure it does by simply importing the model file in `src/data/init.ts`
-   `src/data/init.ts` - Add this import. Similarly import any model you shall be creating in future.

```ts
import mongoose from "mongoose";

// define Mongoose models by importing them
import "./models/Product";
// ...import any models you create in future here

// ...rest of the code
```

## Step 15: Define DB service to fetch Products (with pagination)

-   Define methods that shall make DB queries. Since these shall be useful across the app, we define it as a service.
-   Create a `src/data/services/` folder
-   **IMPORTANT**: Note that this is **NOT** the `src/services` folder - this is for a different purpose (client-side services for data fetching)
-   Within `src/data/services/products.ts`
    -   Define a method to get products whilst supporting pagination
    -   Make sure you understand the code well.

```ts
import mongoose from "@/data/init";

const Product = mongoose.model("Product");

export const getProducts = async (page: number = 1) => {
    let inferredPage = 1;

    if (page) {
        if (!isNaN(+page)) {
            inferredPage = +page;
        }
    }

    const count = await Product.countDocuments();

    const products = await Product.find()
        .skip((inferredPage - 1) * 10)
        .limit(10)
        .select("-__v -createdAt -updatedAt -description -reviews");

    const mappedProducts = products.map((p) =>
        p.toJSON({ flattenObjectIds: true })
    );

    return {
        count,
        page: inferredPage,
        products: mappedProducts,
    };
};
```

## Step 16: Fetch data for the Products List page at build time (SSG), and render it at build time

-   Make sure you understand the following code well, especially `getStaticProps()`, and when and where the code runs.
    -   Understand how the data it generates is passed as props for the component.
    -   **NOTE**: During client-side navigation to this page, getStaticProps() does not execute again by default. Instead, the previously generated static page with its associated data is served from the cache.
        -   You can regenerate this data periodically using the `revalidate` option passed in the returned object (in addition to props option).
-   `src/pages/products/index.tsx`

```tsx
import Head from "next/head";
import ProductsList from "@/components/products-list/products-list";

import { getProducts } from "@/data/services/products";
import { IProduct } from "@/types/product";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

export default function ProductsPage({ count, page, products }: Props) {
    return (
        <>
            <Head>
                <title>List of products</title>
                <meta
                    name="description"
                    content="Mantra Store - search through our variety of products."
                />
            </Head>

            <ProductsList products={products} count={count} page={page} />
        </>
    );
}

// runs at build time on the server
export const getStaticProps = async () => {
    try {
        const { count, page, products } = await getProducts();

        return {
            props: {
                count,
                page,
                products,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};
```

-   `src/components/products-list/products-list.tsx` - update it to accept the data and render it

```tsx
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ProductListItem from "./item/item";

import { IProduct } from "@/types/product";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

const ProductsList = ({ products, count, page }: Props) => {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                List of products
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {products.map((product) => (
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
```

-   Following usual React JS practice, render an product (item) using a separate component `item.tsx`.
-   We shall be applying additional component styles (for item.tsx) using `src/components/products-list/item/item.module.scss`. For this first install `sass`

```
npm i sass
```

-   `src/components/products-list/item/item.module.scss` - Make sure you understand the code.

```scss
.category__container {
    position: relative;

    .category {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 144px;
        width: 144px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        opacity: 0.75;
        border-radius: 0;
        font-size: 1em;
        transform: rotate(-45deg) translateY(-100px);
        background-color: crimson;
        color: white;
    }
}
```

-   `src/components/products-list/item/item.tsx` - Make sure you understand the code.

```tsx
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
    return (
        <Card
            sx={{ alignItems: "stretch", minWidth: "100%" }}
            className={classes.category__container}
        >
            <div
                className={classes.category}
                style={{ backgroundColor: getBgColor(product.category) }}
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
```

## Step 17: Set up API route to fetch products page-by-page from the client-side

-   We shall set up pagination on the client-side. For that however, our backend must expose relevant APIs to the frontend.
-   APIs are set up in the `src/pages/api` folder
-   Such code is server-side code. The methods we shall set up will receive HTTP requests and send HTTP responses.
-   Routing setup for APIs (`src/pages/api/` folder) works the same way as client-side pages routing.
-   `src/pages/api/products` - Set up the requests handler like so

```ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/types/product";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { getProducts } from "@/data/services/products";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<
        | IApiResponse<
              IProduct | { count: number; page: number; products: IProduct[] }
          >
        | IErrorMessage
    >
) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const page = req.query.page ? +req.query.page : 1;
                const {
                    count,
                    page: inferredPage,
                    products,
                } = await getProducts(page);
                return res.status(200).json({
                    status: "success",
                    message: {
                        count,
                        page: inferredPage,
                        products,
                    },
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        default:
            return res.status(405).json({
                status: "error",
                message: `METHOD=${method} not allowed`,
            });
    }
};

export default handler;
```

-   `src/types/api` - Set up the types `IApiResponse`, `IErrorMessage`

```ts
export interface IApiResponse<Message> {
    status: "success" | "error";
    message: Message;
}

export type IErrorMessage = IApiResponse<string>;
```

-   Test the `/api/products` API out with Postman or your browser

## Step 18: Fetch products page-by-page from the client-side

-   `src/services/products.ts` - Note that this is **different from** `src/data/services/products.ts`. - We shall set up client-side API services in this new file.
-   First install `axios`, then create this file

```
npm i axios
```

```tsx
import axios from "axios";
import { IProduct } from "../types/product";

type IGetProductsResponse = {
    status: "success" | "error";
    message: {
        count: number;
        page: number;
        products: IProduct[];
    };
};

export const getProducts = async (page: number = 1) => {
    const response = await axios.get<IGetProductsResponse>(
        `/api/products?page=${page}`
    );
    return response.data;
};
```

-   `src/components/products-list/products-list.tsx` - Add support for client-side pagination. We also handle loading state, and show errors in a Snackbar. Most of the Snackbar code is taken from an example on the component in the MUI documentation.

```tsx
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
            {!loading && !error && (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {/* note that actualProducts (i.e. of the current page) are used */}
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
            )}
        </>
    );
};

export default ProductsList;
```

## Step 19: Create the Product Details page

-   `src/pages/products/[id]/index.tsx` (`ProductDetailsPage`) - This defines the `/products/[id]` route where `[id]` is a placeholder for any product's id. Note that we can also create it as `[id].tsx` if we do not plan to have any paths building on this one.
-   This component shall also render at build time (SSG), and hence needs the product details.
-   `src/data/services/products.ts` - Define the service method to get a product's details

```ts
export const getProductById = async (_id: string) => {
    const product = await Product.findById(_id);
    const serializedProductReviews = product.reviews.map((review: any) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });

    return {
        ...product.toJSON({ flattenObjectIds: true }),
        reviews: serializedProductReviews,
    };
};
```

-   `src/components/product-detail/product-detail.tsx` - The component rendered by the `ProductDetailsPage`

```tsx
import { IProduct } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

type Props = {
    productId: string | undefined;
    product: IProduct;
};

const ProductDetail = ({ productId, product }: Props) => {
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
        </div>
    );
};

export default ProductDetail;
```

-   `src/pages/products/[id]/index.tsx` - The page component. Note the comment on `useRouter()` hook, and the usage of `params` argument passed to `getStaticProps()` to get the value of the dynamic params (`id`). Also note the usage of `revalidate` prop to periodically regenerate this SSG page (every 60 seconds).

```tsx
import Head from "next/head";
import { GetStaticPropsContext } from "next";

import ProductDetail from "@/components/product-detail/product-detail";
import { getProductById } from "@/data/services/products";
import { IProduct } from "@/types/product";

// import { useRouter } from 'next/router';

type Props = {
    _id: string;
    product: IProduct;
};

const ProductDetailPage = ({ _id, product }: Props) => {
    // NOTE: The useRouter() hook can be used to get params information on the client-side. We shall use this in future.
    // const router = useRouter();

    // console.log(router.pathname);
    // console.log(router.query);

    // const id = router.query.id as string;

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

export const getStaticProps = async (
    context: GetStaticPropsContext<{ _id: string }>
) => {
    const { params } = context;
    const _id = params?._id as string;

    return {
        props: {
            _id: _id,
            product: await getProductById(_id),
        },
        revalidate: 60,
    };
};

export default ProductDetailPage;
```

-   However after this step we get this error in the browser when visiting the product details page

```
Server Error
Error: getStaticPaths is required for dynamic SSG pages and is missing for '/products/[id]'.
Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value
```

-   For dynamic routes, Next JS does not know what params (`id` values) exist. It will be unable to generate the pages without the information regarding all possible id values (or at least the ones which are treated as "relevant" enough so as to generate their product detail pages at build time - for example a set of "featured" products).
    -   To overcome this problem, Next JS requires us to define a `getStaticPaths()` function as well for pages with dynamic params.
-   `src/data/services/products.ts` - Add the service method that returns list of all product ids (at least the ones considered relevant for SSG).

```tsx
export const getProductsIds = async () => {
    const products = await Product.find().select("_id");
    return products.map((p) => p._id.toString());
};
```

-   `src/pages/products/[id]/index.tsx` - Add `getStaticPaths()`

```tsx
// import getProductsIds as well now
import { getProductById, getProductsIds } from "@/data/services/products";

// ...component code, getStaticProps() code

export const getStaticPaths = async () => {
    const _ids = await getProductsIds();
    return {
        paths: _ids.map((_id) => {
            return {
                params: { _id: _id },
            };
        }),
        fallback: true,
    };
};
```

## Step 20: Create a `ProductReviews` component to render below Product details (on `/products/[id]`), and an `AddReview` component to render below it on `/products/[id]/addreview`

-   The `ProductDetail` component shows on top for both routes, but what shows below it changes (either `ProductReviews` ot `AddReview`)
-   One way to achieve this is using Dynamic routes which match any number of params - this is indicated by naming the file as `[..._id]` instead of `[id]`. We start by creating the 2 new components though.
-   `src/components/product-details/product-reviews/product-reviews.tsx` - Create `ProductReviews` component
    -   Create a basic component (left as an exercise)
-   `src/components/product-details/add-review/add-review.tsx` - Create `AddReview` component
    -   Create a basic component (left as an exercise)
-   `src/pages/products/[_id]/index.tsx` -> Update its name to `src/pages/products/[..._id]/index.tsx`
-   Now change the code within the same file to work with array params \_id instead of a single param.

```tsx
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
```

-   `src/components/product-detail/product-detail.tsx` - Use the `useRouter()` hook to get the value of \_id[1]. Use it to decide which component to show.

```tsx
// ...other imports
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import ProductReviews from "./product-reviews/product-reviews";
import AddReview from "./add-review/add-review";

// ...other code

const ProductDetail = ({ productId, product }: Props) => {
    const router = useRouter();

    const _idRouter = router.query._id as string[];

    if (!_idRouter) {
        return <div>Loading...</div>;
    }

    let el;

    if (_idRouter[1] === undefined) {
        el = <ProductReviews />;
    } else if (_idRouter[1] !== "addreview") {
        el = <div>Something went wrong</div>;
    } else {
        el = <AddReview />;
    }

    return (
        <div>
            <Paper elevation={3}>{/* UI as before */}</Paper>

            <Box sx={{ mt: 3 }}>{el}</Box>
        </div>
    );
};
```

-   You will need to manually add `/addreview` at the end of the product details URL to see the component change.

## Step 21: Render product reviews

-   `src/components/product-detail/product-reviews/product-reviews.tsx`

```tsx
import { IReview } from "@/types/product";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    Typography,
} from "@mui/material";

type Props = {
    productId: string | undefined;
    reviews: IReview[];
};

const ProductReviews = ({ productId, reviews }: Props) => {
    if (!reviews || (reviews.length && reviews.length === 0)) {
        return <p>No reviews yet. Be the first one to add a review!</p>;
    }

    return (
        <div>
            <h2>Reviews</h2>
            <List>
                {reviews.map((review) => (
                    <ListItem key={review._id} sx={{ my: 3 }}>
                        <ListItemAvatar>
                            <Avatar>{review.username.substring(0, 1)}</Avatar>
                        </ListItemAvatar>
                        <div>
                            <div>{review.date.toString()}</div>
                            <div>
                                <Rating
                                    name="read-only"
                                    value={review.rating}
                                    readOnly
                                />
                                <Typography component="div">
                                    {review.text}
                                </Typography>
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ProductReviews;
```

-   `src/components/product-detail/product-detail.tsx` - Make changes to pass the props that ProductReviews now expects

```tsx
if (_idRouter[1] === undefined) {
    el = <ProductReviews productId={productId} reviews={product.reviews} />;
}
```

-   You can now see the product reviews displayed below the product details

## Step 22: Render a button to navigate to `/products/[_id]/addreview`

-   Ideally we can do this using a Next JS Link. However, just for the purpose of learning how to navigate programatically, we do it using the router's `push()` method
-   `src/components/product-detail/product-reviews/product-reviews.tsx` - Add a button with a click handler that when invoked uses the router's `push()` method for navigation

```tsx
import { useRouter } from "next/router";

// ...code

const ProductReviews = ({ productId, reviews }: Props) => {
    const router = useRouter();
    const _id = router.query._id as string[];

    const navigateToAddReview = () => {
        router.push(`/products/${_id[0]}/addreview`);
    };

    // ...code

    return (
        <div>
            <h2>Reviews</h2>
            <Button
                variant="contained"
                sx={{ my: 3 }}
                onClick={navigateToAddReview}
            >
                Add Review
            </Button>
            {/* more UI */}
        </div>
    );
};
```

## Step 23: Adding `/auth` to show login page

-   Further steps like adding review, adding product, adding product to cart requires a user to be authenticated. We can implement authentication using JWT using jsonwebtoken library ourselves, but Next JS apps usually implement authentication/authorization using `next-auth`. We specifically use v3 (although latest is v4). We also need to force installation as this library has peer dependency of React/ReactDOM v16, v17, but we are using React v18. Note that v4 would be preferable, but author (Prashanth Puranik) prefers v3 as he is not yet familiar with v4. We also install bcryptjs as this is needed for password hashing

```
npm i --force next-auth@3.15.0 bcryptjs @types/bcryptjs
```

-   We start by building the login/register page to be shown on `/auth`
-   `src/components/auth/auth-form.tsx`

```tsx
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    return (
        <section>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form>
                {!isLogin && (
                    <Box sx={{ my: 2 }}>
                        <TextField
                            required
                            type="text"
                            id="username"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(event.target.value)}
                            sx={{ width: "600px", maxWidth: "100%" }}
                        />
                    </Box>
                )}
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setEmail(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setPassword(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <Button variant="outlined" type="submit">
                        {isLogin ? "Login" : "Create Account"}
                    </Button>
                    <Box sx={{ my: 2 }}>
                        <Button
                            type="button"
                            variant="text"
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin
                                ? "Create new account"
                                : "Login with existing account"}
                        </Button>
                    </Box>
                </Box>
            </form>
        </section>
    );
}

export default AuthForm;
```

-   `src/pages/auth.tsx` - Create the page component that shows the auth form

```tsx
import Head from "next/head";

import AuthForm from "@/components/auth/auth-form";

export default function AuthPage() {
    return (
        <>
            <Head>
                <title>Login/Register | Mantra Store</title>
                <meta
                    name="description"
                    content="Login / Register with Mantra Store"
                />
            </Head>

            <AuthForm />
        </>
    );
}
```

## Step 24: Make modifications to the main navigation to show new items based on whether user is logged in or not

-   `src/components/main-navigation/main-navigation`

```tsx
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
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

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
    const handleCloseUserMenu = (href?: string) => {
        if (!href) {
            return setAnchorElUser(null);
        }

        router.push(href);
    };

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
```

## Step 25: Set up the User model, and DB services to register a user

-   `src/types/user.ts` - Set up the Types required to set up the User model using Mongoose. Since the `User` documents also store the cart for the user (array of cart items), we will define how a cart item looks like.

```ts
export interface IUserCartItem {
    productId: string;
    quantity: number;
}

export interface IUser {
    email: string;
    username: string;
    password: string;
    role?: "customer" | "admin";
    cart?: IUserCartItem[];
}
```

-   `src/data/models/User.ts` - Set up a User model

```ts
import mongoose from "mongoose";
import { IUserCartItem, IUser } from "@/types/user";

export const CartItem = new mongoose.Schema<IUserCartItem>({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

export const schema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    cart: {
        type: [CartItem],
        default: [],
    },
});

if (!mongoose.modelNames().includes("User")) {
    mongoose.model<IUser>("User", schema);
}
```

-   `src/data/services/auth.ts` - Define a service method to register a new user

```ts
import mongoose from "@/data/init";
import { IUser } from "@/types/user";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

export const register = async (user: IUser) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        user.password = hashedPassword;

        const registeredUser = await User.create(user);
        const serializedUser = registeredUser.toJSON({
            flattenObjectIds: true,
        });

        delete serializedUser.password;
        delete serializedUser.cart;

        return serializedUser;
    } catch (error) {
        if ((error as any).code === 11000) {
            throw new Error("User already exists");
        }

        throw error;
    }
};
```

-   `src/data/init.ts` - Register the User model by running the model file

```ts
import "./models/User";
```

## Step 26: Create the register API route

-   `src/pages/api/auth/register` - Set up the API to register a new user

```tsx
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/types/user";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { register } from "@/data/services/auth";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<IUser> | IErrorMessage>
) => {
    const { method } = req;

    switch (method) {
        case "POST":
            const user = req.body;

            try {
                const registeredUser = await register(user);
                return res.status(201).json({
                    status: "success",
                    message: registeredUser,
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        default:
            return res.status(405).json({
                status: "error",
                message: `METHOD=${method} not allowed`,
            });
    }
};

export default handler;
```

## Step 27: Set up frontend service for registration and consume it in the auth-form to enable registration

-   `src/services/auth.ts` - Set up the service method for registration from the frontend.

```ts
import { ICredentials, IRegister } from "@/types/user";
import axios from "axios";

type IRegisterResponse = {
    status: "success" | "error";
    message: {
        email: string;
        role: "customer" | "admin";
    };
};

export const register = async (credentials: IRegister) => {
    const response = await axios.post<IRegisterResponse>(
        `/api/auth/register`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
```

-   `src/components/auth/auth-form.tsx` - Make the API call when a new user tries to register

-   Import the service

```tsx
import { register } from "@/services/auth";
```

-   Add the following method in the compoent

```tsx
async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
        // registration
        if (!isLogin) {
            await register({ email, username, password });
            alert(username + " registered successfully");
            setIsLogin(true);
            return;
        }
    } catch (error) {
        alert((error as Error).message);
    }
}
```

-   Set it up as the form submit event handler

```tsx
<form onSubmit={submitHandler}>{/* for ui */}</form>
```

-   With this a user should be able to create a new account

## Step 28: Create login and other API endpoints using Next Auth

-   `src/types/user.ts` - Add the following types / interfaces

```tsx
export type IRegister = Pick<IUser, "email" | "username" | "password">;

export type ICredentials = Pick<IUser, "email" | "password">;

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}
```

-   `src/pages/api/auth/[...nextauth].ts` - Setup API routes for auth through Next Auth

```tsx
import mongoose from "@/data/init";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";
import { ICredentials } from "@/types/user";

const User = mongoose.model("User");

console.log("User", User);

export default NextAuth({
    session: {
        jwt: true,
        maxAge: 60 * 60 * 24 * 30,
    },
    providers: [
        Providers.Credentials({
            async authorize({ email, password }: ICredentials) {
                // find user by email
                const user = await User.findOne({ email });

                // if user not found, throw error
                if (!user) {
                    throw new Error("User not found");
                }

                // compare login password and user's actual (hashed) password
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                // if password is invalid, throw error
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // return user's claims (for some reason, the claims does not accept extra parameters like username and role)
                const claims = {
                    email: user.email,
                    username: user.username,
                    role: user.role,
                };

                return claims;
            },
        }),
    ],
});
```

## Step 29: Implement login in the frontend

-   `src/components/auth/auth-form.tsx`
-   Add the necessary imports

```tsx
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
```

-   Get the router for programmatic navigation. Add the code to handle login.

```tsx
function AuthForm() {
    const router = useRouter();

    // ...more code

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // registration
            // ...code handling registration

            // login
            if (isLogin) {
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });

                if (result && result.error === null) {
                    router.push("/products");
                } else {
                    alert("Login failed");
                }
            }
        } catch (error) {
            alert((error as Error).message);
        }
    }

    // ...more code
}
```

-   You will find yourself redirected to /products on successful login. Observe the changes in the main navigation as well.

## Step 30: Handling logout

-   `src/components/main-navigation/main-navigation.tsx`
-   Add the necessary imports

```tsx
import { useSession, signOut } from "next-auth/client";
```

-   Make code changes to handle click of "Logout"

```tsx
const handleCloseUserMenu = async (href?: string) => {
    if (!href) {
        return setAnchorElUser(null);
    }

    if (href === "/logout") {
        await signOut();
        window.location.href = "/auth";
        return;
    }

    router.push(href);
};
```

## Step 31: Preventing navigation to login page once logged in

-   `src/components/auth/auth-form.tsx`
-   Add the necessary imports

```tsx
import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";
```

-   Add this code just before your return the form UI

```tsx
// prevent navigation to this page if session exists
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    getSession({}).then((session) => {
        if (session) {
            // bad but a temporray fix for router.push() giving problems
            window.location.href = "/profile";
        } else {
            setIsLoading(false);
        }
    });
}, []);

if (isLoading) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: 4,
            }}
        >
            Loading...
        </Box>
    );
}

// return the actual form UI
// ...
```

### Step 32: Adding `change-password` API route, and the profile page which enables user to change password in the frontend

-   `src/pages/api/user/change-password.ts`- Setup as API route to change password (just like user registration, such user management functions are not part of Next Auth)
-   **Note**: This API is protected (user needs to be authentcated in order to use this API). Such API protection is enabled using getSession() of Next Auth - yes, this method works on the client-side as well as the server-side.

```tsx
import mongoose from "@/data/init";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: "Not authenticated!" });
        return;
    }

    const email = session.user?.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            res.status(403).json({ message: "Invalid password!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred!" });
    }
}

export default handler;
```

-   `src/services/user.ts` - Add a frontend API service method used to call this API. Note that the necessary type was created earlier as part of another unrelated step.

```tsx
import { IChangePassword } from "@/types/user";
import axios from "axios";

type IRegisterResponse = {
    message: string;
};

export async function changePassword(passwordData: IChangePassword) {
    const response = await axios.patch<IRegisterResponse>(
        "/api/user/change-password",
        passwordData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}
```

-   `src/components/profile/profile-form.tsx`

```tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { changePassword } from "@/services/user";
import { Box, Button, TextField } from "@mui/material";

function ProfileForm() {
    const router = useRouter();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await changePassword({ oldPassword, newPassword });

            setOldPassword("");
            setNewPassword("");
            alert("Password has been updated");
        } catch (error) {
            alert("Password has not been updated");
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession({}).then((session) => {
            if (!session) {
                // window.location.href = "/auth";
                router.push("/auth");
            } else {
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: 4,
                }}
            >
                Loading...
            </Box>
        );
    }

    return (
        <section>
            <h1>Change Password</h1>
            <form onSubmit={submitHandler}>
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        label="Old Password"
                        value={oldPassword}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setOldPassword(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <TextField
                        required
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        value={newPassword}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setNewPassword(event.target.value)}
                        sx={{ width: "600px", maxWidth: "100%" }}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <Button variant="outlined" type="submit">
                        Change password
                    </Button>
                </Box>
            </form>
        </section>
    );
}

export default ProfileForm;
```

-   `src/pages/profile.tsx` - Create the page component that renders the profile form component

```tsx
import Head from "next/head";
import ProfileForm from "@/components/profile/profile-form";

const ProfilePage = () => {
    return (
        <>
            <Head>
                <title>My profile</title>
                <meta name="description" content="User profile information" />
            </Head>

            <ProfileForm />
        </>
    );
};

export default ProfilePage;
```

-   An additional way to prevent navigation to a route is via `getServerSideProps()` that checks if the request is associated with a session, and if not, prevents navigation to the profile page. If you implement this, you can remove the corresponding check (that uses `loading` and `getSession()` inside a `useEffect()`).
-   `src/pages/profile.tsx`
-   Add the necessary imports

```tsx
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
```

-   Add session check in `getServerSideProps()`

```tsx
// NOTE: This is the server-side alternative to the useEffect() to protect the /profile route in the Profile component
export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
```

## Step 33: Adding a review

-   `src/data/services/reviews.ts` - Backend service to add a review for a product with given `_id`

```ts
import mongoose from "@/data/init";
import { IReview } from "@/types/product";

const Product = mongoose.model("Product");

export const createReview = async (_id: string, review: IReview) => {
    const product = await Product.findByIdAndUpdate(
        _id,
        {
            $push: {
                reviews: review,
            },
        },
        { new: true }
    );

    const serializedProductReviews = product.reviews.map((review: any) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });
    return serializedProductReviews.reviews;
};
```

-   `src/pages/api/products/[_id]/reviews.ts` - Add API for adding a review for a product with given `_id`. Note how we protect this API using `getSession()`

```ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/types/product";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { createReview } from "@/data/services/reviews";
import { getSession } from "next-auth/client";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<IProduct> | IErrorMessage>
) => {
    const { method } = req;

    switch (method) {
        case "POST":
            const session = await getSession({ req: req });

            if (!session) {
                res.status(401).json({
                    status: "error",
                    message: "Not authenticated!",
                });
                return;
            }

            try {
                let _id = req.query._id as string;
                const review = req.body;

                review.username = session.user?.email;
                review.date = new Date().toISOString();

                const reviews = await createReview(_id, review);

                return res.status(201).json({
                    status: "success",
                    message: reviews,
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        default:
            return res.status(405).json({
                status: "error",
                message: `METHOD=${method} not allowed`,
            });
    }
};

export default handler;
```

-   `src/services/reviews.ts`

```ts
import axios from "axios";
import { IReview } from "../types/product";

type IPostReviewResponse = {
    status: "success" | "error";
    message: IReview[];
};

export const postReview = async (
    productId: string,
    review: Partial<IReview>
) => {
    const response = await axios.post<IPostReviewResponse>(
        `/api/products/${productId}/reviews`,
        review,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
```

-   `src/components/product-details/add-review/add-review.tsx`

```tsx
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
            const reviews = await postReview(productId, {
                rating,
                text,
            });
            router.push(`/products/${productId}`);
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
```

-   `src/components/product-detail/product-detail.tsx` Pass on the `productId` prop to `AddReview`

```tsx
el = <AddReview productId={_idRouter[0]} />;
```

## Step 34: Create backend services to get User's cart, update cart

-   `src/data/services/cart.ts`

```tsx
import mongoose from "@/data/init";
import { IUserCartItem } from "@/types/user";

const User = mongoose.model("User");
const Product = mongoose.model("Product");

export const getCart = async (email: string) => {
    const data = await User.findOne({ email });

    const cart = data.cart;

    const productIds = cart.map(
        (cartItem: IUserCartItem) => cartItem.productId
    );

    const products = await Product.find({
        _id: {
            $in: productIds,
        },
    }).select("_id title price image");

    const returnedCart = data.cart.map((cartItem: IUserCartItem) => {
        const product = products.find(
            (p) => (p as any)._id.toString() === cartItem.productId
        );

        return {
            product: {
                _id: product._id?.toString() || "",
                title: product.title || "",
                price: product.price || "",
                image: product.image || "",
            },
            quantity: cartItem.quantity,
        };
    });

    return returnedCart;
};

export const updateCart = async (email: string, cart: IUserCartItem) => {
    const data = await User.findOneAndUpdate(
        { email },
        {
            cart: cart,
        },
        { new: true }
    );
    const dataJson = data.toJSON({ flattenObjectIds: true });
    delete dataJson.password;

    return dataJson.cart;
};
```

## Step 35: Define API routes to work with the cart (get cart, update cart)

-   `src/pages/api/cart/index.ts`

```tsx
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { getCart, updateCart } from "@/data/services/cart";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method } = req;

    const session = await getSession({ req: req });

    if (!session || !session.user) {
        res.status(401).json({ message: "Not authenticated!" });
        return;
    }

    const email = session.user.email as string;

    switch (method) {
        case "GET":
            try {
                const cart = await getCart(email);
                return res.status(200).json({
                    status: "success",
                    message: {
                        cart,
                    },
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        case "PUT":
            const cart = req.body;

            try {
                const updatedCart = await updateCart(email, cart);
                return res.status(200).json({
                    status: "success",
                    message: {
                        cart: updatedCart,
                    },
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        default:
            return res.status(405).json({
                status: "error",
                message: `METHOD=${method} not allowed`,
            });
    }
};

export default handler;
```

## Step 36: Define frontend service methods to work with the cart API (get cart, update cart)

-   `src/services/cart.ts`

```tsx
import axios from "axios";
import { ICartItem } from "@/types/cart";

type IGetOrPutCartResponse = {
    status: "success" | "error";
    message: {
        cart: ICartItem[];
    };
};

export const getCart = async () => {
    const response = await axios.get<IGetOrPutCartResponse>(`/api/cart`);
    return response.data;
};

export const updateCart = async (
    cart: { productId: string; quantity: number }[]
) => {
    const response = await axios.put<IGetOrPutCartResponse>(`/api/cart`, cart, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
```

-   `src/types/cart.ts` - Define the `ICartItem` type to go with this service

```tsx
import { IProduct } from "./product";

export interface ICartItem {
    product: string | IProduct;
    quantity: number;
}
```

## Step 37: Define a context object to share cart information in the app

-   `src/context/shopping-cart.tsx`

```tsx
import { createContext, useContext } from "react";
import { ICartItem } from "@/types/cart";

const CartContext = createContext({
    cart: [] as any[],
    changeQuantity: (productId: string | undefined, quantity: number) => {},
    setCart: (cart: ICartItem[]) => {},
});

export const CartProvider = CartContext.Provider;

export const useCart = () => useContext(CartContext);
```

## Step 38: Set up the context provider

-   The \_app.tsx wraps the complete app's UI, and is a good place to maintain the cart state and provide to the entire appliction using the shopping-cart context
-   `src/pages/_app.tsx`
-   Add the necessary imports

```tsx
import { useState } from "react";
import { CartProvider } from "@/context/shopping-cart";
import { updateCart } from "@/services/cart";
```

-   Define the state maintaining the shopping cart and methods to make changes to this state. Gather all the information to be shared into a value object

```tsx
const [cart, setCart] = useState<any>([]);

const changeQuantity = async (
    productId: string | undefined,
    quantityToAdd: number
) => {
    if (!productId) {
        return;
    }

    let newCart = [...cart];

    const index = newCart.findIndex((item) => item.productId === productId);

    if (index >= 0) {
        newCart[index] = {
            ...newCart[index],
            quantity: newCart[index].quantity + quantityToAdd,
        };
    } else {
        newCart.push({ productId: productId, quantity: quantityToAdd });
    }

    newCart = newCart.filter((item) => item.quantity > 0);

    const cartToSend = newCart.map((item) => {
        return {
            productId: item.product ? item.product._id : item.productId,
            quantity: item.quantity,
        };
    });

    const response = await updateCart(cartToSend);

    const updatedCart = response.message.cart;

    setCart(updatedCart);

    return updatedCart;
};

const value = {
    cart,
    changeQuantity,
    setCart,
};
```

-   Share the shopping cart value using the shopping cart context object

```tsx
<AppCacheProvider {...props}>
    <CartProvider value={value}>
        {/* rest of UI */}
    </CartProvider>
<AppCacheProvider>
```

## Step 39: Populate the shopping cart from within the main navigation component, when user logs in

-   `src/components/main-navigation/main-navigation.tsx`
-   Add the necessary imports

```tsx
import Badge from "@mui/material/Badge";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/context/shopping-cart";
import { getCart } from "@/services/cart";
import { useEffect } from "react";
```

-   Update the shopping cart when user logs in

```tsx
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
```

-   Add the shopping cart icon (which shows the cart status) before the user Avatar

```tsx
{
    session && !loading && (
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
    );
}
```

-   You should see the number of items in the user's shopping cart when the user logs in

## Step 40: Add a cart icon on list page items, through which user can add to the cart

-   `src/components/products-list/items/item.tsx`
-   Add the necessary imports

```tsx
import { useCart } from "@/context/shopping-cart";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
```

-   Add code to get the `changeQuantity()` method from the shopping cart context. Also get session information using `getSession()` and maintain it in state

```tsx
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
```

-   Add a shopping cart icon (after the ShareIcon) to add the product to the cart if session exists (user is logged in)

```tsx
{
    /* Add a shopping cart icon to add the product to the cart if session exists (user is logged in) */
}
{
    session && !loading && (
        <IconButton aria-label="add to cart">
            <ShoppingCart onClick={() => changeQuantity(product._id, 1)} />
        </IconButton>
    )
}
```

-   After logging in you can find the shopping cart icon on the product list items. Clicking them adds to the cart (note the change in number of items in the main navigation menu).

## Step 41: Show the ShoppingCart page

-   `src.pages/cart.tsx` - We render this on the server-side using `getServerSideProps()`. This is ideal as the shopping cart is a very dynamic (fast-changing) page. SSG is not a good fit for it. We also make sure during SSR that if the user is not logged in, the cart page cannot be accessed.

```tsx
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";

import Cart from "@/components/cart/cart";
import { ICartItem } from "@/types/cart";

import { getCart } from "@/data/services/cart";

type Props = {
    cart: ICartItem[];
};

export default function CartPage({ cart }: Props) {
    return (
        <>
            <Head>
                <title>Shopping cart | Mantra Store</title>
                <meta name="description" content="Shopping cart" />
            </Head>

            <Cart cart={cart} />
        </>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });

    if (!session || !session.user || !session.user.email) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    const email = session.user.email;

    const cart = await getCart(email);

    return {
        props: { cart },
    };
};
```

-   `src/components/cart/cart.tsx` - We create the `Cart` component that is used in the CartPage.

```tsx
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
```
