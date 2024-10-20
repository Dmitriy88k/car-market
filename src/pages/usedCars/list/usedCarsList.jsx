import { useState, useEffect } from "react";
import styles from "./usedCarsList.module.css";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import UsedCarsItem from "../item/usedCarsItem";
import PropTypes from "prop-types";

async function getData() {
  const querySnapshot = await getDocs(collection(db, "listings"));

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

const UsedCarsList = ({maxPrice}) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setListings(data);
    });
  }, []);

  const filteredListings = listings.
    filter((listing) => listing.price <= maxPrice) 
    .sort((a, b) => a.price - b.price);


  return ( 
    <div className={styles.used_cars_list}>
      {filteredListings.map((listing) => (
        <UsedCarsItem key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

UsedCarsList.propTypes = {
  maxPrice: PropTypes.number.isRequired, 
};



export default UsedCarsList;
