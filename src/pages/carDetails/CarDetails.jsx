import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../carDetails/carDetails.module.css"

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

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.car_details_page}>
      <div className={styles.car_details_section}>
        <div className={styles.main_car_image}>
          <img src={car.images[0]} alt="" />
        </div>
        <div className={styles.cars_list}>
          {car.images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${car.make} ${car.model} ${index + 1}`}> 
            </img>
          ))}
        </div>
        
        <h1>{car.make} {car.model}</h1>

      </div>
      
      
    </div>
  );
};

export default CarDetails;
