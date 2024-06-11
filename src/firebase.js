// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

let _app;
export const app = init();

function init() {
  if(!_app) {
    _app = initializeApp(firebaseConfig);
  }

  return _app;
}




