import { NavLink } from "react-router-dom";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Menu = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                    activeClassName="active"
                    exact
                >
                    Workshops App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            activeClassName="active"
                            exact
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/workshops"
                            activeClassName="active"
                            exact
                        >
                            List of workshops
                        </Nav.Link>
                        {isAuthenticated && (
                            <Nav.Link
                                as={NavLink}
                                to="/feedback"
                                activeClassName="active"
                                exact
                            >
                                Feedback
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav className="my-2 my-lg-0" navbarScroll>
                        {!isAuthenticated && (
                            <Nav.Link
                                as={NavLink}
                                to="#"
                                onClick={async () =>
                                    await loginWithRedirect({
                                        appState: {
                                            returnTo: "/workshops",
                                        },
                                    })
                                }
                            >
                                Login
                            </Nav.Link>
                        )}
                        {isAuthenticated && (
                            <>
                                <Nav.Link as="span">
                                    <Image
                                        src={user?.picture}
                                        alt={user?.name}
                                        style={{
                                            width: "32px",
                                            borderRadius: "50%",
                                            marginRight: "16px",
                                        }}
                                    />
                                    <span>
                                        Welcome <strong>{user?.name}</strong>!
                                    </span>
                                </Nav.Link>
                                <Nav.Link
                                    as="span"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        logout({
                                            logoutParams: {
                                                returnTo:
                                                    window.location.origin,
                                            },
                                        })
                                    }
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
