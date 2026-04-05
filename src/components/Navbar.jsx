import styles from "./Navbar.module.css";
import cinepulseLogo from "../assets/CinePulse_Logo.png";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? styles.activeLink : styles.inactiveLink;

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.leftSide}>
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
      </div>

      <div className={styles.rightSide}>
        <span>Sammy</span>
        <User className={styles.avatar} />
      </div>
    </nav>
  );
};

export default Navbar;
