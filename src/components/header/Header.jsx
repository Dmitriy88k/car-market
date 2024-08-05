import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import IconImg from "../../assets/logo.png";
import LogOutImg from "../../assets/log-out.png"
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

            <button onClick={() => signOut(auth)} className={styles.logOut_button}><img src={LogOutImg}/>Log out</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Header;
