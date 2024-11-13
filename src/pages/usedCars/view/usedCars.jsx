import UsedCarsList from "../list/usedCarsList";
import styles from "./usedCars.module.css";
import PriceFilter from "../../../components/priceFilter/priceFilter";
import MileageFilter from "../../../components/mileageFilter/mileageFilter";
import YearFilter from "../../../components/yearFilter/yearFilter";
import {useState} from 'react';



const UsedCars = () => {

  const [maxPrice, setMaxPrice] = useState(50000);
  const [maxMileage, setMaxMileage] = useState (100000);
  const [yearRange, setYearRange] = useState({ fromYear: "", toYear: ""});

  const handleYearFilterApply = (range) => {
    setYearRange(range);
  };

  return (
    <div className={styles.used_cars_list_and_filter}>
      
      <div className={styles.used_cars_list}>
        
        <UsedCarsList maxPrice={maxPrice} maxMileage={maxMileage} yearRange={yearRange}/>
      </div>

      <div className={styles.used_cars_filter}>
        <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
        <MileageFilter maxMileage={maxMileage} setMaxMileage={setMaxMileage}/>
        <YearFilter onFilterApply={handleYearFilterApply}/>
      </div>
      
    </div>
  );
};

export default UsedCars;
