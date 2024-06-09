import React from "react";
import Header from '../../components/header/Header'
import styles from './UsedCars.module.css'



const UsedCars = () => {
  return (
    <div className={styles.used_cars_container}>
      <Header />
    </div>
  )
}

export default UsedCars;