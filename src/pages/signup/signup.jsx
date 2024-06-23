import {getAuth, createUserWithEmailAndPassword, /*signInWithEmailAndPassword,*/} from "firebase/auth";
import { app } from "../../firebase";
import React, { useState } from "react";
import styles from "../signup/Signup.module.css";
import IconImg from "../../assets/logo.png";
import { Link } from "react-router-dom";


const auth = getAuth(app);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //save accessToken to LocalStorage and then redirect to the right page
        //TO-DO REFRESH TOKEN???

        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };


  return (
    <div className={styles.signup_page}>
      <div className={styles.signup_left_side}>
        <div className={styles.signup_left_header}>
          <h1>Sell Your Car Fast and Safe</h1>
        </div>
        <div className={styles.signup_left_bottom}>
          <div className={styles.signup_left_bottom_text}>
            <p>Do you already have an account?</p>
          </div>
          <div className={styles.signup_left_bottom_button}>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.signup_right_side}>
        <div className={styles.signup_input_title}>
          <Link to="/">
            <img src={IconImg} alt="" />
          </Link>
          
          <h2>Tell us about yourself</h2>
          <p>Enter your details to proceed further</p>
        </div>
        <form onSubmit={onSubmit} className={styles.signup_form}>
          <div className={styles.email_input}>
            <input
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </div>
          <div className={styles.signup_user_info}> 
            <div className={styles.signup_user_first_name}>
              <input 
              placeholder="First name"
              type="text" />
            </div>
            <div className={styles.signup_user_last_name}>
            <input 
              placeholder="Last name"
              type="text" />
            </div>
          </div>
          <div className={styles.password_input}>
            <input
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>
          <div className={styles.confirm_password_input}>
            <input
              placeholder="Confirm password"
              type="password"
            />
          </div>
          <div className={styles.terms_and_conditions}>
            <input
              type="checkbox"
              required
            />
            <label>I agree with the <a href="">Terms & Conditions.</a></label>
          </div>
          

          <button><span>Submit</span></button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
