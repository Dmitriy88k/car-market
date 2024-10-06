import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { app, db } from "../../firebase";
import { collection, addDoc} from "firebase/firestore";
import { useState } from "react";
import styles from "../signup/signup.module.css";
import IconImg from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";


const auth = getAuth(app);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: `${firstName} ${lastName}`,
        picture: "https://thumbs.dreamstime.com/b/default-avatar-man-to-social-user-default-avatar-man-to-social-user-vector-illustration-109538855.jpg", // Placeholder or default URL
      });

      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      console.log(errorCode, errorMessage);
    }

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
          {error && <p className={styles.error_message}>{error}</p>}


          <input className={styles.signup_inputs}
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
          />

          <div className={styles.signup_user_info}> 

            <input 
              placeholder="First name"
              type="text" 
              className={styles.signup_user_first_name}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
   
  
            <input 
              placeholder="Last name"
              type="text" 
              className={styles.signup_user_last_name}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>

          <input
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className={styles.signup_inputs}
            required
          />

          <input
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            className={styles.signup_inputs}
            required
          />

          <div className={styles.terms_and_conditions}>

            <input
              type="checkbox"
              required
            />

            <div>
              <p className={styles.terms_and_conditions_text}>
                <span>I agree with the</span> <a href="">Terms & Conditions.</a>
              </p>
            </div>
            
          </div>
          

          <button><span>Submit</span></button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
