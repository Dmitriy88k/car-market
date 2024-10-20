import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import IconImg from "../../assets/logo.png";
import DownImg from "../../assets/down.png";
import { app, db } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

async function getDatav2(uid) {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.error("No user found with UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const MyLink = ({ name, link }) => {
  return (
    <li className={styles.nav_link_item}>
      <NavLink
        className={({ isActive}) => 
          `${styles.nav_link} ${isActive && styles.active_link}`
        }
        to={link}
      >
        {name}
      </NavLink>
    </li>
    
  );
};

MyLink.propTypes = {
  name: PropTypes.string.isRequired, 
  link: PropTypes.string.isRequired, 
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getDatav2(currentUser.uid).then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <MyLink name="Home" link={"/"}/>
          <MyLink name="Used Cars" link={"/used-cars"}/>
          <MyLink name="Sell Car" link={"/sell-car"}/>
          <MyLink name="Contact Us" link={"/contact-us"}/>
        </ul>
      </div>

      <div className={styles.auth_links}>
        {!isAuthenticated && !loading && (
          <>
            <a
              href="/login"
              className={styles.auth_link}
              target="_blank"
              rel="noopener noreferer"
            >
              Login
            </a>
            <span className={styles.separator}> | </span>
            <a
              href="/signup"
              className={styles.auth_link}
              target="_blank"
              rel="noopener noreferer"
            >
              Sign Up
            </a>
          </>
        )}

        {isAuthenticated && !loading && (
          <>
            <div className={styles.profile_section}>
              <div>
                {profile?.picture && (
                  <img
                    src={profile?.picture || "default-profile-pic.png"}
                    alt=""
                    onClick={toggleDropdown}
                  />
                )}
              </div>

              <div>
                <span
                  onClick={toggleDropdown}
                  className={styles.dropdown_profile}
                >
                  {profile?.name || "Profile"}
                  <span className={styles.drop_down_img}>
                    <img src={DownImg} alt="" />
                  </span>
                </span>
              </div>

              {dropdownOpen && (
                <div className={styles.dropdown_menu} ref={dropdownRef}>
                  <Link to="/profile-settings" className={styles.dropdown_item}>
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.dropdown_item}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
