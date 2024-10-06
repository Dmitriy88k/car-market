import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./usedCarsItem.module.css";

const UsedCarsItem = ({ listing }) => {
  return (
    <Link to={`/car-details/${listing.id}`} className={styles.used_cars_card}>
      
        
        {listing.images && listing.images.length > 0 && (
          <img
            className={styles.used_cars_image}
            src={listing.images[0]}
            alt={`${listing.make} ${listing.model}`}
          />
        )}
        {!listing.images?.length && (
          <div className={styles.image_placeholder}/>
        )}
        
        <div className={styles.used_cars_description}>
          <div className={styles.used_cars_description_name_and_year}>
            <p className={styles.used_cars_description_year}>
              {listing.year}
            </p>
            <p className={styles.used_cars_description_name}>
              {listing.make} {listing.model}
            </p>
          </div>
          
          <p className={styles.used_cars_description_mileage}>
            {Number(listing.mileage).toLocaleString()} miles
          </p>
          <p className={styles.used_cars_description_price}>
            ${Number(listing.price).toLocaleString()}
          </p>
          
        </div>
      
    </Link>
    
  );
};

UsedCarsItem.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default UsedCarsItem;
