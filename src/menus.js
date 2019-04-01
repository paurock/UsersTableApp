import { NavLink } from "react-router-dom";
import "./stylesheets/menus.scss";

const selectedStyle = {
  backgroundColor: "white",
  color: "slategray"
};

export const MainMenu = () => (
  <nav className="main-menu">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/users" activeStyle={selectedStyle}>
      [Users]
    </NavLink>
  </nav>
);
