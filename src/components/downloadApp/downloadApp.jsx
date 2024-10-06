import styles from './downloadApp.module.css';
import carPhone from "../../assets/carphone.png";
import appleIcon from "../../assets/apple.png"
import googleIcon from "../../assets/google.png"

const DownloadApp = () => {
  return(
    <div className={styles.download_section}>
      <div className={styles.car_phone}>
        <img src={carPhone} alt="" />
        
      </div>
      <div className={styles.download_text}>
        <h1>Follow Cars On the Go!</h1>
        <h2>Download the <span className={styles.demetrix}>Demetrix</span> App Today!</h2>
        <p>Find the right car, truck, or SUV. Use our verified ratings and reviews to lacate a reputable dealer near you with confidence!</p>
        <div className={styles.download_icons}>
          <img src={appleIcon} alt="" />
          <img src={googleIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default DownloadApp;