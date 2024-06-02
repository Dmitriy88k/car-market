import React from 'react';
import Header from '../../components/header/Header'
import Cards from '../../components/typeCarCards/Cards'
import DownloadApp from '../../components/downloadApp/DownloadApp';
import Consultation from '../../components/consultation/consultation'
import mainImg from "../../assets/red-mercedes.png"
import styles from '../mainPage/Main.module.css'
import { app, analytics } from './firebase';

const MainPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.mainText}>
          <h1 className={styles.header}>Used Cards for Sale</h1>
          <h2 className={styles.subheader}>Buy with confidence.</h2>
          <p className={styles.paragraph}>Everything you need to browse nearby cars, all in one place.</p>
          <p className={styles.paragraph}>Used listings include a description!</p>
        </div>
        <div><img src={mainImg} alt="" /></div>
      </div>
      <Cards />
      <Consultation />
      <DownloadApp />
    </div>
  );
};


export default MainPage;

