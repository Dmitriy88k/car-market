import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import IconImg from "../../assets/logo.png";

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container}>
        <div className={styles.logo}>
          <img src={IconImg} alt="logo" />
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div
            className={`${styles.bar} ${menuOpen ? styles.change : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${menuOpen ? styles.change : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${menuOpen ? styles.change : ""}`}
          ></div>
        </div>
        <ul
          className={`${styles.nav_links} ${menuOpen ? styles.nav_active : ""}`}
        >
          <li className={styles.nav_link_item}>
            <Link
              className={`${styles.nav_link} ${
                pathname === "/" ? styles.active_link : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className={styles.nav_link_item}>
            <Link
              className={`${styles.nav_link} ${
                pathname === "/used-cars" ? styles.active_link : ""
              }`}
              to="/used-cars"
            >
              Used Cars
            </Link>
          </li>
          <li className={styles.nav_link_item}>
            <Link
              className={`${styles.nav_link} ${
                pathname === "/sell-car" ? styles.active_link : ""
              }`}
              to="/sell-car"
            >
              Sell Car
            </Link>
          </li>
          <li className={styles.nav_link_item}>
            <Link
              className={`${styles.nav_link} ${
                pathname === "/contact-us" ? styles.active_link : ""
              }`}
              to="/contact-us"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.auth_links}>
        <Link className={styles.auth_link} to="/login">
          Login
        </Link>
        <span className={styles.separator}> | </span>
        <Link className={styles.auth_link} to="/signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Header;
