import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import IconImg from "../../assets/logo.png";
import DownImg from "../../assets/down.png"
import { app, db } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import {collection, getDocs, query, where} from "firebase/firestore";


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


const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [profile, setProfile] = useState();
  const [auth, setAuth] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleLogout = () => {
    signOut(auth);
  }

  useEffect(() => {
    setAuth(getAuth(app))
  },[])

 
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth?.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe && unsubscribe(); 
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    setTimeout(async () => {
      const data = await getDatav2(currentUser.uid);
      setProfile(data);
    }, 1000); 
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return ()=> {
      document.removeEventListener("mousedown", handleClickOutside);
    }
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
            <div className={styles.profile_section}>
              <div>
                <img 
                  src={profile?.picture || "default-profile-pic.png"} 
                  alt="" 
                  onClick={toggleDropdown}  
                />
              </div>
              
              <div>
                <span onClick={toggleDropdown} className={styles.dropdown_profile}>
                  {profile?.name || "Profile"} 
                  <span className={styles.drop_down_img}>
                    <img src={DownImg} alt="" />
                  </span>
                </span>
              </div>
              

              {dropdownOpen && (
                <div className={styles.dropdown_menu} ref={dropdownRef}>
                  <Link to="/profile" className={styles.dropdown_item}>
                    View Profile
                  </Link>
                  <Link to="/settings" className={styles.dropdown_item}>
                    Settings
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
