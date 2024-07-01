import React from "react";
import Header from "../../../components/header/Header";
import UsedCarsList from "../list/UsedCarsList";
import styles from "./UsedCars.module.css";




const UsedCars = () => {

  return (
    <div>
      <Header />
      <div className={styles.used_cars_container_and_filter}>
        <UsedCarsList />
        <div className={styles.used_cars_filter}></div>
      </div>
      
    </div>
  )};

export default UsedCars;
