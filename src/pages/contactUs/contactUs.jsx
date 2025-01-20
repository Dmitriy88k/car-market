import styles from "../contactUs/contactUs.module.css";

const contactUs = () => {
  return (
  <div className={styles.contact_us_page}>
    <div className={styles.contact_us_left_side_info}>
      <h1>Contact Us</h1>
      <p>Feel free to use the form or drop us an email. Old-fashioned phone calls work too. </p>
    </div>

    <div className={styles.contact_us_right_side_form}></div>
  </div>

)}

export default contactUs;