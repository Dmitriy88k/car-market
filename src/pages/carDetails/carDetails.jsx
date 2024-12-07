import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../carDetails/carDetails.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "../../components/footer/footer"

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const carDoc = await getDoc(doc(db, "listings", id));
      if (carDoc.exists()) {
        setCar(carDoc.data());
      } else {
        console.log("No such car found!");
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car || !car.images || car.images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.car_details_page}>
      <div className={styles.car_details_section}>
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          thumbs={{ swiper: thumbsSwiper }}
          className={styles.main_car_image_swiper}
        >
          {car.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${car.make} ${car.model} ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={10}
          modules={[Thumbs]}
          watchSlidesProgress={true}
          watchSlidesVisibility={true}
          loop={false}
          className={styles.thumbnails_swiper}
        >
          {car.images.map((image, index) => (
            <SwiperSlide key={index} className={activeIndex === index ? "swiper-slide-thumb-active" : ""}>
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnail_image}
                
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <h1>
          {car.year} {car.make} {car.model}  
        </h1>

        <h2>${car.price.toLocaleString()}</h2>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;
