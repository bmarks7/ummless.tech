import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
