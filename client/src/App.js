import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Progress from './Pages/Progress'
import SpeechDetails from "./Pages/SpeechDetails";
import {useState} from 'react'

import {useAuth0} from '@auth0/auth0-react'

function App() {
  const {isLoading, isAuthenticated} = useAuth0();

  const [userAuth, setUserAuth] = useState(isAuthenticated)

  if (isLoading) return <p>Loading...</p>

  return (
    <BrowserRouter>
      
      <Header />
      
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/progress" element={<Progress />} />
        <Route exact path="/details/:id" element={<SpeechDetails />} />
      </Routes>

      <Outlet />
    
    </BrowserRouter>
  );
}

export default App;
