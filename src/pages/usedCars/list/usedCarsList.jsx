import { useState, useEffect } from "react";
import styles from "./usedCarsList.module.css";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import UsedCarsItem from "../item/usedCarsItem";
import PropTypes from "prop-types";

async function getData() {
  const querySnapshot = await getDocs(collection(db, "listings"));

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...doc.data(),
      year: parseInt(data.year, 10),
      price: parseFloat(data.price),
      mileage: parseFloat(data.mileage),
    };
  });
}

const UsedCarsList = ({maxPrice, maxMileage, yearRange}) => {
  const [listings, setListings] = useState([]);
  
  

  useEffect(() => {
    getData().then((data) => {
      setListings(data);
    });
  }, []);

  const filteredListings = listings.filter((listing) => {
    const price = parseFloat(listing.price);
    const mileage = parseFloat(listing.mileage);
    const year = parseInt(listing.year, 10);

    const isWithinPrice = price <= maxPrice;
    const isWithinMileage = mileage <= maxMileage;
    const isWithinYearRange = 
      (!yearRange.fromYear || year >= parseInt(yearRange.fromYear)) &&
      (!yearRange.toYear || year <=parseInt(yearRange.toYear));
      
    return isWithinPrice && isWithinMileage && isWithinYearRange;
  });
    


  return ( 
    <div className={styles.used_cars_list}>
      {filteredListings.map((listing) => (
        <UsedCarsItem 
          key={listing.id} 
          listing={{
            ...listing,
            year: parseInt(listing.year, 10),
          }}
        />
      ))}
    </div>
  );
};

UsedCarsList.propTypes = {
  maxPrice: PropTypes.number.isRequired, 
  maxMileage: PropTypes.number.isRequired,
  yearRange: PropTypes.shape({
    fromYear: PropTypes.string,
    toYear: PropTypes.string,
  }).isRequired,
};



export default UsedCarsList;
