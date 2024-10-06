import UsedCarsList from "../list/usedCarsList";
import styles from "./usedCars.module.css";
import Filter from "../../../components/filter/filter";

const UsedCars = () => {
  return (
    <div className={styles.used_cars_list_and_filter}>
      <div className={styles.used_cars_list}>
        <UsedCarsList />
      </div>

      <div className={styles.used_cars_filter}>
        <Filter />
      </div>
    </div>
  );
};

export default UsedCars;
