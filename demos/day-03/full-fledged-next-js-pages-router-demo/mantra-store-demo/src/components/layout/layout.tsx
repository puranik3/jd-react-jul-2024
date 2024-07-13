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
