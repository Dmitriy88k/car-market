import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import IconImg from "../../assets/logo.png";
import { app, db } from "../../firebase";
import { getAuth } from "firebase/auth";
import {collection, getDocs, query, where} from "firebase/firestore";


async function getDatav2(uid) {
  const q = query(collection(db, "users"), where("uid", "==", uid))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].data()
}


const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [profile, setProfile] = useState();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    getAuth(app).authStateReady().then(() => {
      setCurrentUser(getAuth(app).currentUser)
    })
  }, [])

  useEffect(() => {
    if (!currentUser) return
    getDatav2(currentUser.uid).then(data => {
      setProfile(data);
    })
  },[currentUser])

  console.log(profile)

  const isAuthenticated = !!currentUser;

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
        {!isAuthenticated && (
          <>
            <a href="/login" className={styles.auth_link} target="_blank" rel="noopener noreferer"> 
              Login
            </a>
            <span className={styles.separator}> | </span>
            <a href="/signup" className={styles.auth_link} target="_blank" rel="noopener noreferer"> 
              Sign Up
            </a>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link className={styles.auth_link} to="/login">
              {!profile && "Profile"}
              {profile && 
                <div className={styles.profile_section}>
                  <img src={profile.picture} alt="" />
                  <span>{profile.name}</span>
                </div>}
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Header;
