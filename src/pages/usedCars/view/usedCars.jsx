import UsedCarsList from "../list/usedCarsList";
import styles from "./usedCars.module.css";
import PriceFilter from "../../../components/priceFilter/priceFilter";
import MileageFilter from "../../../components/mileageFilter/mileageFilter";
import YearFilter from "../../../components/yearFilter/yearFilter";
import { useState, useEffect } from "react";
import DownImg from "../../../assets/down.png";


const UsedCars = () => {
  const [maxPrice, setMaxPrice] = useState(50000);
  const [maxMileage, setMaxMileage] = useState(100000);
  const [yearRange, setYearRange] = useState({ fromYear: "", toYear: "" });
  const [mobileFilter, setMobileFilter] = useState(false);
  const [phoneView, setPhoneView] = useState(false);

  const handleYearFilterApply = (range) => {
    setYearRange(range);
  };

  const toggleMobileFilter = () => {
    setMobileFilter((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth <= 955);
      if (window.innerWidth > 955) {
        setMobileFilter(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize)
  },[]);

  return (
    <div>
      <div className={styles.used_cars_list_and_filter}>
        {phoneView && (
          <div className={styles.mobile_filter_button}>
          <button onClick={toggleMobileFilter}>
            Filter
            <span className={styles.drop_down_img}>
              <img src={DownImg} alt="" />
            </span>
          </button>
        </div>
        )}
        

        <div className={styles.used_cars_container}>
          <div className={styles.used_cars_list}>
            <UsedCarsList
              maxPrice={maxPrice}
              maxMileage={maxMileage}
              yearRange={yearRange}
            />
          </div>

          <div
            className={styles.used_cars_filter}
            style={{ display: mobileFilter ? "block" : "none" }}
          >
            <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            <MileageFilter
              maxMileage={maxMileage}
              setMaxMileage={setMaxMileage}
            />
            <YearFilter onFilterApply={handleYearFilterApply} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedCars;
