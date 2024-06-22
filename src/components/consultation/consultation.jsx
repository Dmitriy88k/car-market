import React from "react";
import styles from './consultation.module.css';


const Consultation = () => {
  return (
    <div className={styles.consultationSection}>
      <div className={styles.consultationText}>
        <h5>Need professional advice about car?</h5>
        <p>Our specialist contact you to help make best choice. It's free!</p>
      </div>

      <div className={styles.consultationForm}>
          <input type="text" placeholder="Your name"/>
          <input type="tel" placeholder="Phone number" className={styles.phoneInput}/>
          <button>GET FREE COUNSULTATION</button>
      </div>
    </div>
  )
}

export default Consultation;