import { useEffect, useState, useRef} from "react";
import { Link, useLocation  } from "react-router-dom";
import styles from "./header.module.css";
import IconImg from "../../assets/logo.png";
import DefaultAvatarPicture from "../../assets/default-avatar-picture.webp";
import DownImg from "../../assets/down.png";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { MyLink } from "../myLink/myLink";
import { getProfileId } from "../../api";
import { useProfile } from "../hooks/useProfile";
import { useClickOutside } from "../hooks/useClickOutside";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [profileId, setProfileId] = useState();
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profile = useProfile(profileId);

  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  },[location.pathname])
  

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
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getProfileId(currentUser.uid).then((id) => {
      setProfileId(id);
    });
  }, [currentUser]);

  useClickOutside(dropdownRef, () => {
    setDropdownOpen(false);
  });

  const isAuthenticated = !!currentUser;

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_container} >
        <div className={styles.logo}>
          <Link to="/">
            <img src={IconImg} alt="logo" />
          </Link>
        </div>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.change : ""}`}
          onClick={toggleMenu}
        >
          <div className={`${styles.bar} ${styles.bar1}`}></div>
          <div className={`${styles.bar} ${styles.bar2}`}></div>
          <div className={`${styles.bar} ${styles.bar3}`}></div>
        </div>
        <ul className={`${styles.nav_links} ${menuOpen ? styles.nav_active : ""}`}
        >
           {menuOpen && (
    <button className={styles.close_button} onClick={toggleMenu}>
      &times;
    </button>
  )}
          <MyLink name="Home" link="/"  />
          <MyLink name="Used Cars" link="/used-cars"  />
          <MyLink name="Sell Car" link="/sell-car" />
          <MyLink name="Contact Us" link="/contact-us" />

          <div className={styles.auth_links_mobile}>
            {!isAuthenticated && (
              <>
                <MyLink name="Log In" link="/login"/>
                <MyLink name="Sign Up" link="/signup"/>
              </>
            )}
            {isAuthenticated && (
              <>
                <MyLink name="Profile" link="/profile-settings"></MyLink>
                <li onClick={handleLogout}>
                  <a href="#"  className={styles.mobile_logout} >Log Out</a>
                </li>
              </>
              
            )}
          </div>

        </ul>
      </div>

      <div className={styles.auth_links}>
        {!isAuthenticated && !loading && (
          <>
            <a
              href="/login"
              className={styles.auth_link}
              rel="noopener noreferer"
            >
              Login
            </a>
            <span className={styles.separator}> | </span>
            <a
              href="/signup"
              className={styles.auth_link}
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
                    src={profile?.picture || DefaultAvatarPicture}
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
