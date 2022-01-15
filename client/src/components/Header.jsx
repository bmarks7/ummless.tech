import { NavLink } from "react-router-dom";
import "../Styles/Header.scss";

const Layout = () => {
  return (
    <div className="navBar">
      <div className="navBar__titleContainer">
        <h1>UmmLess.tech</h1>
        <h2>Toast more, Umm Less.</h2>
      </div>
      <nav className="navBar__container">
        <NavLink
          to="/"
          className="navBar__link"
          activeClassName="navBar__selected"
        >
          Home
        </NavLink>
        <NavLink
          to="/progress"
          className="navBar__link"
          activeClassName="navBar__selected"
        >
          Progress
        </NavLink>
        <NavLink
          to="/login"
          className="navBar__link"
          activeClassName="navBar__selected"
        >
          Login
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
