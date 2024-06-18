import {
  getAuth,
  /*createUserWithEmailAndPassword,*/ signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase";
import React, { useState } from "react";
import styles from "../login/Login.module.css";
import IconImg from "../../assets/logo.png";
import { Link } from "react-router-dom";


const auth = getAuth(app);

const Login = () => {
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
    <div className={styles.login_page}>
      <div className={styles.login_left_side}>
        <div className={styles.login_left_header}>
          <h1>A new way to buy and sell cars</h1>
        </div>
        <div className={styles.login_left_bottom}>
          <div className={styles.login_left_bottom_text}>
            <p>You don't have an account?</p>
          </div>
          <div className={styles.login_left_bottom_button}>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <div className={styles.login_right_side}>
        <div className={styles.login_input_title}>
          <Link to="/">
            <img src={IconImg} alt="" />
          </Link>
          
          <h2>Sign In to your account</h2>
          <p>Enter your details to proceed further</p>
        </div>
        <form onSubmit={onSubmit} className={styles.login_form}>
          <div className={styles.email_input}>
            <input
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </div>
          <div className={styles.password_input}>
            <input
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>

          <button><span>Sign In</span></button>
        </form>
        <div className={styles.login_or_option}>
          <p>OR</p>
        </div>
        <div className={styles.google_btn}>
          <button>Sign Up with Google</button>
        </div>
        <div className={styles.facebook_btn}>
          <button>Sign Up with Facebook</button>
        </div>
        <div className={styles.twitter_btn}>
          <button>Sign Up with Twitter</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
