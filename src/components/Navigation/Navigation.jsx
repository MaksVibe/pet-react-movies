import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => (
  <div className="container">
    <nav>
      <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
        Home
      </NavLink>
      {/* <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
        Search Movies
      </NavLink> */}
      <NavLink
        to="/my-movies"
        className={s.link}
        activeClassName={s.activeLink}
      >
        My Movies
      </NavLink>
    </nav>
  </div>
);

export default Navigation;
