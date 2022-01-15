import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Progress from "./Pages/Progress";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route exact path="/progress" element={<Progress />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
