import React from "react";
import styles from "./trending.module.css";
import bmwImg from "../../assets/bmw.jpg";
import audiImg from "../../assets/audi.jpg";
import lexusImg from "../../assets/lexus.jpg";
import rangeImg from "../../assets/range.jpg";

const Trending = () => {
  return (
    <div className={styles.trending_section}>
      <h1 className={styles.trending_header}>Trending Near You</h1>
      <div className={styles.grid_trending_container}>
        <div className={styles.trending_post}>
          <img src={bmwImg} alt="" />
          <h6>BMW Lovers</h6>
          <p>51,457 vehicles</p>
        </div>
        <div className={styles.trending_post}>
          <img src={audiImg} alt="" />
          <h6>Used cars under $25,000</h6>
          <p>23,325 vehicles</p>
        </div>

        <div className={styles.trending_post}>
          <img src={rangeImg} alt="" />
          <h6>Compact SUV's</h6>
          <p>7,653 vehicles</p>
        </div>

        <div className={styles.trending_post}>
          <img src={lexusImg} alt="" />
          <h6>Luxury Cars</h6>
          <p>32,958 vehicles</p>
        </div>
      </div>
      <div className={styles.carousel}>
        <span className={styles.signs}>&lt;</span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.signs}>&gt;</span>
      </div>
    </div>
  );
};

export default Trending;
