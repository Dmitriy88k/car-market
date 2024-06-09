// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD4biX6MO5FTZFXR7V4Y7QRgHy4gjwOvk",
  authDomain: "car-market-a1a88.firebaseapp.com",
  databaseURL: "https://car-market-a1a88-default-rtdb.firebaseio.com",
  projectId: "car-market-a1a88",
  storageBucket: "car-market-a1a88.appspot.com",
  messagingSenderId: "1003166801716",
  appId: "1:1003166801716:web:7a02529ea890dd28010f61",
  measurementId: "G-SQR4WMGH8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
// Initialize other Firebase services as needed

export { db, auth };

