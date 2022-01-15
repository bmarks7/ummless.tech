import "./App.scss";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Home</h1>
      <Link to="/progress">Progress</Link>
      <Outlet />
    </div>
  );
}

export default App;
