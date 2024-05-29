import React from 'react';
import styles from './DownloadApp.module.css';
import carPhone from "../../assets/carphone.png";
import appleIcon from "../../assets/apple2.png"
import googleIcon from "../../assets/google2.png"

const DownloadApp = () => {
  return(
    <div className={styles.downloadSection}>
      <div className={styles.carPhone}>
        <img src={carPhone} alt="" />
        
      </div>
      <div className={styles.downloadText}>
        <h1>Follow Cars On the Go!</h1>
        <h2>Download the <span className={styles.demetrix}>Demetrix</span> App Today!</h2>
        <p>Find the right car, truck, or SUV. Use our verified ratings and reviews to lacate a reputable dealer near you with confidence!</p>
        <div className={styles.downloadIcons}>
          <img src={appleIcon} alt="" />
          <img src={googleIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default DownloadApp;