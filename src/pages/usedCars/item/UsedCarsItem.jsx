import React from "react";
import { Link } from "react-router-dom";
import styles from "./UsedCarsItem.module.css";

const UsedCarsItem = ({ listing }) => {
  return (
    <Link to={`/car-details/${listing.id}`} className={styles.link}>
      <div className={styles.used_cars_card}>
        <div key={listing.id} className={styles.used_cars_image_section}>
          <div className={styles.used_cars_image}>
            {listing.images && listing.images.length > 0 && (
              <img
                src={listing.images[0]}
                alt={`${listing.make} ${listing.model}`}
              />
            )}
          </div>
        </div>
        <div className={styles.used_cars_description}>
          <div className={styles.used_cars_description_name_and_year}>
            <div className={styles.used_cars_description_year}>
              <p>{listing.year}</p>
            </div>
            <div className={styles.used_cars_description_name}>
              <p className={styles.used_cars_description_make}>{listing.make}</p>
              <p className={styles.used_cars_description_model}>
                {listing.model}
              </p>
            </div>
          </div>
          <div className={styles.used_cars_description_price_and_mileage}>
            <p className={styles.used_cars_description_mileage}>
              {Number(listing.mileage).toLocaleString()} miles
            </p>
            <p className={styles.used_cars_description_price}>
              ${Number(listing.price).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
    
  );
};

export default UsedCarsItem;
