import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Progress from "./Pages/Progress";
import {Auth0Provider} from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route exact path="/progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
