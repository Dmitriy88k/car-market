import React from "react";
import styles from './consultation.module.css';
import IconImg from "../../assets/logo.png"

const Consultation = () => {
  return (
    <div className={styles.consultationSection}>
      <div className={styles.consultationText}>
        <h5>Need professional advice about a car?</h5>
        <p>Our specialist will contact you to help you to make the best choice. It's  absolutely free!</p>
      </div>

      <div className={styles.consultationForm}>
          <input type="text" placeholder="Your name"/>
          <input type="tel" placeholder="Phone number" className={styles.telInput}/>
          <button>GET FREE COUNSULTATION</button>
      </div>
    </div>
  )
}

export default Consultation;