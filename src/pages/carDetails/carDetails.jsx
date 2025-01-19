import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../carDetails/carDetails.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import GasStationImg from "../../assets/gas-station.png"
import CarType from "../../assets/car.png"
import CarMileage from "../../assets/speed.png"
import CarColor from "../../assets/drawing.png"
import CarPrice from "../../assets/price-tag.png"
import Drivetrain from "../../assets/drivetrain.png"

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

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
        < Carousel
          infiniteLoop
          className={styles.caroussel_section}
          showThumbs={true}
        >
          {car.images.map((image, index) => (
            <div key={index} className={styles.car_swiper}>
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={styles.main_image}
              />
            </div>
          ))}

        </Carousel>

        <h1>
          {car.year} {car.make} {car.model}  
        </h1>

        <h2>${car.price.toLocaleString()}</h2>
      </div>
      <div className={styles.car_features}>
        <h1>Features</h1>
        <div className={styles.car_description_section}>
            <div className={styles.car_specifications}>
              <img src={CarPrice} alt="" />
              <div className={styles.car_specifications_text}>
                <p className={styles.car_specifications_text_header}>Price</p>
                <p>${car.price.toLocaleString()}</p>
              </div>
            </div>
            
            <div className={styles.car_specifications}>
              <img src={CarMileage} alt="" />
              <div className={styles.car_specifications_text}>
                <p className={styles.car_specifications_text_header}>Mileage</p>
                <p>{car.mileage.toLocaleString()}</p>
              </div>
            </div>

            <div className={styles.car_specifications}>
            <img src={CarColor} alt="" />
              <div className={styles.car_specifications_text}>
                <p className={styles.car_specifications_text_header}>Color</p>
                <p>{car.color}</p>
              </div>
            </div>

            
            <div className={styles.car_specifications}>
            <img src={GasStationImg} alt="" />
              <div className={styles.car_specifications_text}>
                <p className={styles.car_specifications_text_header}>Fuel Type</p>
                <p>{car.fuel}</p>
              </div>
            </div>

            <div className={styles.car_specifications}>
            <img src={CarType} alt="" style={{ width: "60px", height: "70px" }}/>
              <div className={styles.car_specifications_text}>
                <p className={styles.car_specifications_text_header}>Body Type</p>
                <p>{car.type}</p>
              </div>
            </div>
        </div>
      </div>
      

      <div className={styles.car_overview}>
          <h1>Overview</h1>
          <div className={styles.car_overview_specifications}>
            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Make:</p>
              <p>{car.make}</p>
            </div>

            <div className={styles.car_overview_text}>
            <p className={styles.car_overview_text_header}>Model:</p>
              <p>{car.model}</p>
            </div>

            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Year:</p>
              <p>{car.year}</p>
            </div>

            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Body type:</p>
              <p>{car.type}</p>
            </div>

            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Exterior color:</p>
              <p>{car.color}</p>
            </div>

            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Mileage:</p>
              <p>{car.mileage.toLocaleString()} <span className={styles.miles}>mi</span></p>
            </div>

            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Fuel type:</p>
              <p>{car.fuel}</p>
            </div>

            <div className={styles.car_overview_text}>
              <p className={styles.car_overview_text_header}>Drivetrain:</p>
              <p>{car.drivetrain}</p>
            </div>
          </div>
      </div>

      <div className={styles.seller_description}>
        <h1>Seller's description</h1>
        <p>{car.sellerText}</p>
      </div>
    </div>
  );
};

export default CarDetails;
