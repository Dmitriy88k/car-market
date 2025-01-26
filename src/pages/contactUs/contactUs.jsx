import styles from "../contactUs/contactUs.module.css";
import EnvelopeImg from "../../assets/envelope.png"
import GpsImg from "../../assets/gps.png"
import PhoneImg from "../../assets/phone.png"

const contactUs = () => {
  return (
  <div className={styles.contact_us_page}>
    <div className={styles.contact_us_left_side_info}>
      <h1>Contact Us</h1>
      <h3>Feel free to use the form or drop us an email. Old-fashioned phone calls work too. </h3>
      <div className={styles.contact_info}>
        <div className={styles.contact_info_details}><img src={PhoneImg} alt="" /> <p>(212) 333 - 5555</p></div>
        <div className={styles.contact_info_details}><img src={EnvelopeImg} alt="" /> <p>info@demetrix.us</p></div>
        <div className={styles.contact_info_details}><img src={GpsImg} alt="" /> <p>2555 Rainbow Ave. <br />Babylon, NY 11702</p></div>
      </div>
    </div>

    <div className={styles.contact_us_right_side_form}>
      <form action="" className={styles.contact_form}>
        <div className={styles.form_user_name_section}>
          <label htmlFor="">Name</label>
          <div className={styles.form_user_name}>
            <div className={styles.form_user_first_name}>
              <input type="text" placeholder="First"/>
            </div>
            <div className={styles.form_user_last_name}>
              <input type="text" placeholder="Last"/>
            </div>
          </div>
        </div>
          
        <div className={styles.form_user_email}>
          <label htmlFor="">Email</label>
          <input type="text" placeholder="example@email.com"/>
        </div>
        <div className={styles.form_user_phone}>
          <label htmlFor="">Phone (optional)</label>
          <input type="text" placeholder="xxx-xxx-xxxx" />
        </div>
        <div className={styles.form_user_message}>
          <label htmlFor="">Message</label>
          <textarea placeholder="Type your message..." className={styles.user_message_input}/>
        </div>
        <button>Submit</button>
      </form>
    </div>
  </div>

)}

export default contactUs;