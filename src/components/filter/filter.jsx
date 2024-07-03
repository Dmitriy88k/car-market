import React, {useState} from 'react';
import styles from './filter.module.css';

const Filter = () => {
  const [maxPrice, setMaxPrice] = useState(50000);

  const handlePriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleRangeChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div>
      <div className={styles.filter_section}>
        <div className={styles.filters}>
          <div className={styles.price_filter}>
            <label htmlFor="price">Max Vehicle Price</label>
            <input type="number" id="price" name="price" value={maxPrice} onChange={handlePriceChange}/>
            <input type="range" id="priceChange" name="priceRange" min="0" max="100000" step="1000" value={maxPrice} onChange={handleRangeChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter;