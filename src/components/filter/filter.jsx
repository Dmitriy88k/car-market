import React, { useState } from 'react';
import styles from './filter.module.css';

const Filter = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>

    </div>
  )
}

export default Filter;