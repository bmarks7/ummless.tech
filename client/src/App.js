import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";

import {useAuth0} from '@auth0/auth0-react'

function App() {
  const {isLoading} = useAuth0();

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
