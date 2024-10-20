import UsedCarsList from "../list/usedCarsList";
import styles from "./usedCars.module.css";
import Filter from "../../../components/filter/filter";
import {useState} from 'react';



const UsedCars = () => {

  const [maxPrice, setMaxPrice] = useState(50000);
  return (
    <div className={styles.used_cars_list_and_filter}>
      <div className={styles.used_cars_list}>
        <UsedCarsList maxPrice={maxPrice}/>
      </div>

      <div className={styles.used_cars_filter}>
        <Filter maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
      </div>
    </div>
  );
};

export default UsedCars;
