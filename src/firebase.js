import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

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

/*let _app;*/
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

/*function init() {
  if(!_app) {
    _app = initializeApp(firebaseConfig);
  }

  return _app;
}
  */




