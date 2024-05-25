import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css'
import IconImg from "../../assets/logo2.png"

const Header = () => {
  const {pathname} = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return(
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
      <div className={styles.logo}>
        <img src={IconImg} alt="logo" />
      </div>
      <div className ={styles.hamburger} onClick={toggleMenu}>
        <div className={`${styles.bar} ${menuOpen ? styles.change : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.change : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.change : ''}`}></div>
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.navActive : ''}`}>
        <li className={styles.navLinkItem}>
          <Link className={`${styles.navLink} ${pathname === '/' ? styles.activeLink : ''}`} to="/">Home</Link>
        </li>
        <li className={styles.navLinkItem}>
          <Link className={`${styles.navLink} ${pathname === '/used-cars' ? styles.activeLink : ''}`} to="/used-cars">Used Cars</Link>
        </li>        
        <li className={styles.navLinkItem}>
          <Link className={`${styles.navLink} ${pathname === '/sell-car' ? styles.activeLink : ''}`} to="/sell-car">Sell Car</Link>
        </li>        
        <li className={styles.navLinkItem}>
          <Link className={`${styles.navLink} ${pathname === '/contact-us' ? styles.activeLink : ''}`} to="/contact-us">Contact Us</Link>
        </li>  
      </ul>
      </div>
      
      <div className={styles.authLinks}>
          <Link className={styles.authLink} to="/login">Login</Link>
          <span className={styles.separator}> | </span>
          <Link className={styles.authLink} to="/signup">Sign Up</Link>
      </div>

    </nav>
  )
}

export default Header;