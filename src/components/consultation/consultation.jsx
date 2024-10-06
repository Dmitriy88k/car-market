import styles from "./consultation.module.css";

const Consultation = () => {
  return (
    <div className={styles.consultation_section}>
      <div className={styles.consultation_text}>
        <h5>Need professional advice about a car?</h5>
        <p>
          Our specialist will contact you to help you to make the best choice.
          It's absolutely free!
        </p>
      </div>

      <div className={styles.consultation_form}>
        <input type="text" placeholder="Your name" />
        <input
          type="tel"
          placeholder="Phone number"
          className={styles.telephone_input}
        />
        <button>GET FREE COUNSULTATION</button>
      </div>
    </div>
  );
};

export default Consultation;
