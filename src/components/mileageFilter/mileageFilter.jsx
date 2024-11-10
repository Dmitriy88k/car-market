import { useState } from 'react';
import styles from './mileageFilter.module.css';
import PropTypes from 'prop-types';

const MileageFilter = ({maxMileage, setMaxMileage}) => {

  const [showMileageFilter, setShowMileageFilter] = useState(false); 

  const handleMileageChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    setMaxMileage(Number(value));
  };

  const handleRangeChange = (e) => {
    let value = e.target.value;
    setMaxMileage(Number(value));
  };

  const toggleMileageFilter = () => {
    setShowMileageFilter(!showMileageFilter);
  };

  return (
    <div>
      <div className={styles.filter_section}>
        <div className={styles.filters}>
          <div className={styles.filter_header} onClick={toggleMileageFilter}>
            <span>Mileage</span>
            <svg
              className={`${styles.toggle_icon} ${showMileageFilter ? styles.rotate : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          {showMileageFilter && (
            <div className={styles.mileage_filter}>
              <label htmlFor="mileage">Max Mileage</label>
              <div className={styles.input_mileage_wrapper}>
                <input
                  className={styles.input_mileage}
                  type="number"
                  id="mileage"
                  name="mileage"
                  placeholder="50000"
                  value={maxMileage}
                  onChange={handleMileageChange}
                />
              </div>
              
              <input
                className={styles.filter_mileage_range}
                type="range"
                id="mileageChange"
                name="mileageRange"
                min="0"
                max="200000"
                step="1000"
                value={maxMileage}
                onChange={handleRangeChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MileageFilter.propTypes = {
  maxMileage: PropTypes.number.isRequired,  // maxMileage should be a number
  setMaxMileage: PropTypes.func.isRequired, // setMaxMileage should be a function
};


export default MileageFilter;
