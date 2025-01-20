import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import styles from "../login/login.module.css";
import IconImg from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";


const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
     

        const user = userCredential.user;
        console.log(user);

        const accessToken = user.accessToken;
        localStorage.setItem('accessToken', accessToken);

        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/');
    }
  });

  return (
    <div>
      <Header/>
      <div className={styles.login_page}>
      <div className={styles.login_left_side}>
        <div className={styles.login_left_header}>
          <h1>A new way to buy and sell cars</h1>
        </div>
        <div className={styles.login_left_bottom}>
          <div className={styles.login_left_bottom_text}>
            <p>You don`&apos;`t have an account?</p>
          </div>
          <div className={styles.login_left_bottom_button}>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
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
            <input
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
            <input
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />

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
    </div>
    
  );
};

export default Login;
