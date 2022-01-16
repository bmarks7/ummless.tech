import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Progress from "./Pages/Progress";
import SpeechDetails from "./Pages/SpeechDetails";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/progress"
          element={
            <RequireAuth>
              <Progress />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/login"
          element={<h2>Please login to practice your speeches!</h2>}
        />
        <Route
          exact
          path="/details/:id"
          element={
            <RequireAuth>
              <SpeechDetails />
            </RequireAuth>
          }
        />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>

      <Outlet />
    </BrowserRouter>
  );
}

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated === true ? children : <Navigate to="/login" replace />;
}

export default App;
