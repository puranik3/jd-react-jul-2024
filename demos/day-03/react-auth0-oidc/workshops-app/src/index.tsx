import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useHistory } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";

import "./services/configureAxios";

import "bootstrap/dist/css/bootstrap.css";

import App from "./components/App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Auth0Provider
//                 domain="dev-esureafy76zuq0w0.us.auth0.com"
//                 clientId="Q4XJgcFkOmBHOFrA7SEnmlsLDQ2G7xiw"
//                 authorizationParams={{
//                     redirect_uri: window.location.origin,
//                 }}
//             >
//                 <App />
//             </Auth0Provider>
//         </BrowserRouter>
//     </React.StrictMode>
// );
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <App />
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>
);
