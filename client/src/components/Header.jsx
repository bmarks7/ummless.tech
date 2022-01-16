import { NavLink } from "react-router-dom";
import "../Styles/Header.scss";
import { LoginButton } from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

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
          className={({ isActive }) =>
            isActive ? "navBar__selected" : "navBar__link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            isActive ? "navBar__selected" : "navBar__link"
          }
        >
          Progress
        </NavLink>

        <LoginButton />
        <LogoutButton />
        <Profile />
      </nav>
    </div>
  );
};

export default Layout;
