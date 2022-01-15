import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import Profile from './components/Profile'
import {useAuth0} from '@auth0/auth0-react'

function App() {
  const {isLoading} = useAuth0();

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <Header />
      <Profile />
      <Outlet />
    </div>
  );
}

export default App;
