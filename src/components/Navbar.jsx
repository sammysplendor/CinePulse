import styles from "./Navbar.module.css";
import cinepulseLogo from "../assets/CinePulse_Logo.png";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const getLinkClass = ({ isActive }) =>
  isActive ? styles.activeLink : styles.inactiveLink;

const NavItems = ({ onClick }) => (
  <>
    <NavLink to="/" className={getLinkClass} onClick={onClick}>
      Home
    </NavLink>
    <NavLink to="/explore" className={getLinkClass} onClick={onClick}>
      Explore
    </NavLink>
    <NavLink to="/trending" className={getLinkClass} onClick={onClick}>
      Trending
    </NavLink>

    {/* <button
      className={styles.openWatchlistBtn}
      onClick={() => {
        onClick?.();
        onOpenWatchlist?.();
      }}
    >
      See Watchlist
    </button> */}
  </>
);

const Navbar = ({ onOpenWatchlist, setOpenWatchlist }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <nav className={styles.navbarContainer}>
      <img src={cinepulseLogo} alt="CinePulse Logo" />

      {/* --- Desktop --- */}
      <div className={styles.navLinks}>
        <NavItems onOpenWatchlist={onOpenWatchlist} />
      </div>

      {/* --- Mobile --- */}
      <div className={styles.menu}>
        <div className={styles.rightside}>
          <button
            className={styles.openWatchlistBtn}
            onClick={() => setOpenWatchlist(true)}
          >
            See Watchlist
          </button>

          <button
            className={styles.menuBtn}
            onClick={handleMenu}
            aria-label="Toggle menu"
            aria-expanded={openMenu}
          >
            {!openMenu ? (
              <Menu className={styles.menuIcon} />
            ) : (
              <X className={styles.menuIcon} />
            )}
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${openMenu ? styles.open : ""}`}>
          <NavItems
            onOpenWatchlist={onOpenWatchlist}
            onClick={() => setOpenMenu(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
