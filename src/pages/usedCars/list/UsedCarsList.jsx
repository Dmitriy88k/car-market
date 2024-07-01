import React, { useState, useEffect } from "react";
import styles from "./UsedCarsList.module.css";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import UsedCarsItem from "../item/UsedCarsItem"

async function getData() {
  const querySnapshot = await getDocs(collection(db, "listings"));

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

const UsedCarsList = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setListings(data);
    });
  }, []);

  return (
    <div className={styles.used_cars_container}>
        <div className={styles.used_cars_list}>
          {listings.map((listing) => (
            <UsedCarsItem key={listing.id} listing={listing} />
          ))}
        </div>
    </div>
  );
};

export default UsedCarsList;
