import Trending from "../../components/trending/tredning"
import Cards from "../../components/typeCarCards/cards";
import DownloadApp from "../../components/downloadApp/downloadApp";
import Consultation from "../../components/consultation/consultation";
import mainImg from "../../assets/red-mercedes.png";
import styles from "../mainPage/main.module.css";

const MainPage = () => {
  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.main_text}>
          <h1 className={styles.header}>Used Cards for Sale</h1>
          <h2 className={styles.subheader}>Buy with confidence.</h2>
          <p className={styles.paragraph}>
            Everything you need to browse nearby cars, all in one place.
          </p>
          <p className={styles.paragraph}>
            Used listings include a description!
          </p>
        </div>
        <div className={styles.red_mercedes_picture}>
          <img src={mainImg} alt="" />
        </div>
      </div>
      <Trending />
      <Cards />
      <Consultation />
      <DownloadApp />
    </div>
  );
};

export default MainPage;
