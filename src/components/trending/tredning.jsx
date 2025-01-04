import styles from "./trending.module.css";
import bmwImg from "../../assets/bmw.jpg";
import audiImg from "../../assets/audi.jpg";
import lexusImg from "../../assets/lexus.jpg";
import rangeImg from "../../assets/range.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";

const Trending = () => {
  return (
    <div className={styles.trending_section}>
      <h1 className={styles.trending_header}>Trending Near You</h1>
      <div className={styles.swiper_container}>
        <Swiper
          className={styles.swiper_section}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          modules={[Navigation, Pagination, A11y]}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            150: { slidesPerView: 1, },
            640: { slidesPerView: 1, },
            992: { slidesPerView: 2, spaceBetween: 0, centeredSlides: false },
            1290: { slidesPerView: 3, spaceBetween: 0, centeredSlides: false },
          }}
        >
          <SwiperSlide className={styles.swiper_slide}>
            <img src={bmwImg} alt="" />
            <h6>BMW Lovers</h6>
            <p>51,457 vehicles</p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiper_slide}>
            <img src={audiImg} alt="" />
            <h6>Used cars under $25,000</h6>
            <p>23,325 vehicles</p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiper_slide}>
            <img src={rangeImg} alt="" />
            <h6>Compact SUV`&apos;`s</h6>
            <p>7,653 vehicles</p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiper_slide}>
            <img src={lexusImg} alt="" />
            <h6>Luxury Cars</h6>
            <p>32,958 vehicles</p>
          </SwiperSlide>
          <div className={styles.swiper_pagination}></div>
        </Swiper>
      </div>
    </div>
  );
};

export default Trending;
