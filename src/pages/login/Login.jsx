import {
  getAuth,
  //createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase";

import React, { useState } from "react";

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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
