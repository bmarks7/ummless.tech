import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SpeechSummary from "./components/SpeechSummary";

function App() {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <SpeechSummary />
      <Outlet />
    </div>
  );
}

export default App;
