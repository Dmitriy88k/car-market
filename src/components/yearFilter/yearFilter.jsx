import { useState, useEffect } from "react";
import styles from "./yearFilter.module.css";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import PropTypes from "prop-types";

const currentYear = new Date().getFullYear();
const fullYearRange = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
const yearRange = Array.from({length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);


const YearFilter = ({ onFilterApply }) => {
  const [showYearFilter, setShowYearFilter] = useState(false);
  const [fromYear, setFromYear] = useState ("");
  const [toYear, setToYear] = useState("");


  const toggleYearFilter = () => {
    setShowYearFilter(!showYearFilter);
  };

  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const yearQuery = query(listingsRef);
        const querySnapshot = await getDocs(yearQuery);

        const firestoreYears = new Set();
        querySnapshot.forEach((doc) => {
          const year = parseInt(doc.data().year, 10)
          if (!isNaN(year)) firestoreYears.add(year);
        });

        firestoreYears.add(currentYear);

      } catch (e) {
        console.error("error fetching years: ", e);
      }
    }

    fetchAvailableYears();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterApply({ fromYear, toYear });
    
  };


  

  return (
    <div className={styles.filter_section}>
      <div className={styles.filters}>
        <div className={styles.filter_header} onClick={toggleYearFilter}>
          <span>Year</span>
          <svg
            className={`${styles.toggle_icon} ${
              showYearFilter ? styles.rotate : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        {showYearFilter && (
          <div className={styles.filter_options}>
            <form
              onSubmit={handleSubmit}
              className={styles.filter_options_form}
            >
              <label htmlFor="year">Select Year From</label>
              <select
                id="fromYear"
                className={styles.select_year}
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
              >
                <option value="">Year...</option>
                {fullYearRange.map((year) => (
                  <option key={`from-${year}`} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label htmlFor="toYear">To:</label>
              <select
                id="toYear"
                className={styles.select_year}
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
              >
                <option value="">Year...</option>
                {yearRange.map((year) => (
                  <option key={`to-${year}`} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <button type="submit" className={styles.submit_button}>
                Apply
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

YearFilter.propTypes = {
  onFilterApply: PropTypes.func.isRequired,
};

export default YearFilter;
