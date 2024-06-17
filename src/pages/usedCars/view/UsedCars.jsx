import React, { useState, useEffect } from "react";
import Header from '../../../components/header/Header'
import styles from './UsedCars.module.css'
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";


async function getData() {
  const querySnapshot = await getDocs(collection(db, "listings"));

  return querySnapshot.docs.map(doc => {
    return {
        id: doc.id, 
        ...doc.data(),
      }; 
  });

}



const UsedCars = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getData().then(data => {
      setListings(data);
    });
  }, []);

  return (
    <div className={styles.used_cars_container}>
      <Header />
      <div>
        <p>AvailableCars</p>
        {listings.map(listing => (
        <div key={listing.id}>
          <h2>{listing.make}</h2>
          <h3>{listing.model}</h3>
          <p>{listing.year}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default UsedCars;