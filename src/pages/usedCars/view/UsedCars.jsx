import React from "react";
import Header from "../../../components/header/Header";
import UsedCarsList from "../list/UsedCarsList";
import styles from "./UsedCars.module.css";
import Filter from "../../../components/filter/filter";

const UsedCars = () => {
  return (
    <div className={styles.used_cars}>
      <Header />
      <div className={styles.used_cars_list_and_filter}>
        <div className={styles.used_cars_list}>
          <UsedCarsList />
        </div>

        <div className={styles.used_cars_filter}>
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default UsedCars;
