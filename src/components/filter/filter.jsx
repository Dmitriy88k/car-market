import React, { useState } from 'react';
import styles from './filter.module.css';

const Filter = () => {
  //Устанавливаем цену. Изначально цена стоит "$50,000", затем при помощи useState цена отображает то, что ввел User в input
  const [maxPrice, setMaxPrice] = useState("$50,000");

  
  const [showPriceFilter, setShowPriceFilter] = useState(true); 



  //Создаем функцию, которая превращает номер в стринг и заменяет/ставит запятые в правильном месте, например ($1,000)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //Создаем функцию, которая берет значения из инпута, который ввел User, форматируем при помощи вышеуказанной функции 
  // и сохраняем это отформатированное значение
  const handlePriceChange = (e) => {
    //Мы испльзуем let здесь, потому что цену которую вводит User в input всегда будет меняться, она не будет const.
    //Мы берем значение из User input испльзуя .target.value
    let value = e.target.value.replace(/[^0-9]/g, '');
    //Мы форматируем номер, который ввел User, при помощи formatNumber функции в string с запятыми.
    value = formatNumber(value);
    //То что ввел в input наш User, мы сохраняем значение при помощи useState в setMaxPrice 
    //также перед `${value}` мы поставили знак "$", чтобы цена отображалась с этим знаком впереди
    setMaxPrice(`$${value}`);
  };

  const handleRangeChange = (e) => {
    let value = e.target.value;
    value = formatNumber(value);
    setMaxPrice(`$${value}`);
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
              <input
                className={styles.input_price}
                type="text"
                id="price"
                name="price"
                value={maxPrice}
                onChange={handlePriceChange}
              />
              <input
                className={styles.filter_price_range}
                type="range"
                id="priceChange"
                name="priceRange"
                min="0"
                max="100000"
                step="1000"
                value={maxPrice.replace(/[^0-9]/g, '')}
                onChange={handleRangeChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
