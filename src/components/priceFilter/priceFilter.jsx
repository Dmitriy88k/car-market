import { useState } from 'react';
import styles from './priceFilter.module.css';
import PropTypes from 'prop-types';

const PriceFilter = ({maxPrice, setMaxPrice}) => {

  const [showPriceFilter, setShowPriceFilter] = useState(false); 

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    setMaxPrice(Number(value));
  };

  const handleRangeChange = (e) => {
    let value = e.target.value;
    setMaxPrice(Number(value));
  };

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  return (
    <div>
      <div className={styles.filter_section}>
        <div className={styles.filters}>
          <div className={styles.filter_header} onClick={togglePriceFilter}>
            <span>Price</span>
            <svg
              className={`${styles.toggle_icon} ${showPriceFilter ? styles.rotate : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          {showPriceFilter && (
            <div className={styles.price_filter}>
              <label htmlFor="price">Max Vehicle Price</label>
              <div className={styles.input_price_wrapper}>
                <input
                  className={styles.input_price}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="50000"
                  value={maxPrice}
                  onChange={handlePriceChange}
                />
              </div>
              
              <input
                className={styles.filter_price_range}
                type="range"
                id="priceChange"
                name="priceRange"
                min="0"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={handleRangeChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PriceFilter.propTypes = {
  maxPrice: PropTypes.number.isRequired,  // maxPrice should be a number
  setMaxPrice: PropTypes.func.isRequired, // setMaxPrice should be a function
};


export default PriceFilter;
