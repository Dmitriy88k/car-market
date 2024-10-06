import { useState, useEffect } from "react";
import styles from "./footer.module.css";
import Instagram from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Snapchat from "../../assets/snapchat.png";
import Twitter from "../../assets/twitter.png";
import Youtube from "../../assets/youtube.png";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 875);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isFinancingOpen, setIsFinancingOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 875);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.footer_section}>
      <div className={styles.footer_list}>
        <div className={styles.column}>
          <p onClick={() => isMobile && setIsProductsOpen(!isProductsOpen)}>
            Products
          </p>
          <ul
            className={`${styles.drop_down} ${
              isProductsOpen ? styles.show : ""
            }`}
          >
            <li>New Cars</li>
            <li>Used Cars</li>
            <li>Sell My Car</li>
            <li>My Car`&apos;`s Value</li>
          </ul>
        </div>
        <div className={styles.column}>
          <p onClick={() => isMobile && setIsFinancingOpen(!isFinancingOpen)}>
            Financing
          </p>
          <ul
            className={`${styles.drop_down} ${
              isFinancingOpen ? styles.show : ""
            }`}
          >
            <li>Savings</li>
            <li>Payment</li>
            <li>Calculator</li>
            <li>Pre-Qualify</li>
          </ul>
        </div>
        <div className={styles.column}>
          <p onClick={() => isMobile && setIsHelpOpen(!isHelpOpen)}>Help</p>
          <ul
            className={`${styles.drop_down} ${isHelpOpen ? styles.show : ""}`}
          >
            <li>Delivery</li>
            <li>Contact Us</li>
            <li>Dealer Support</li>
            <li>Customer Support</li>
          </ul>
        </div>
        <div className={styles.media_icons}>
          <img src={Instagram} alt="Instagram Icon" />
          <img src={Facebook} alt="Facebook Icon" />
          <img src={Snapchat} alt="Snapchat Icon" />
          <img src={Twitter} alt="Twitter Icon" />
          <img src={Youtube} alt="YouTube Icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
