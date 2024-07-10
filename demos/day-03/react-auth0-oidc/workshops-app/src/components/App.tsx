// It was necessary to import React till React v17
// import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ProtectedRoute } from "./global/ProtectedRoute/ProtectedRoute";
import Menu from "./global/Menu/Menu";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import WorkshopsList from "./pages/WorkshopsList/WorkshopsList";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div>
            <Menu />
            <ToastContainer />

            <Container className="my-4">
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <ProtectedRoute
                        component={WorkshopsList}
                        path="/workshops"
                        exact
                    />
                    <ProtectedRoute
                        component={WorkshopDetails}
                        path="/workshops/:id"
                    />
                    <Route path="**">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
