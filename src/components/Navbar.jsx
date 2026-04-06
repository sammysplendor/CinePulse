import styles from "./Navbar.module.css";
import cinepulseLogo from "../assets/CinePulse_Logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? styles.activeLink : styles.inactiveLink;

  return (
    <nav className={styles.navbarContainer}>
      <img src={cinepulseLogo} alt="CinePulse Logo" />

      <div className={styles.navLinks}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/explore" className={getLinkClass}>
          Explore
        </NavLink>
        <NavLink to="/trending" className={getLinkClass}>
          Trending
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
