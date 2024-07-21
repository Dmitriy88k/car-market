import React, { useState, useRef } from "react";
import styles from "../sellCar/SellCar.module.css";
import Malibu from "../../assets/chevrolet_malibu.png";
import Footer from "../../components/footer/footer";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const vehicleOptions = [
  { value: "", label: "Vehicle type" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "coupe", label: "Coupe" },
  { value: "minivan", label: "Minivan" },
  { value: "van", label: "Van" },
  { value: "pickup", label: "Pickup" },
  { value: "convertible", label: "Convertible" },
  { value: "hatchback", label: "Hatchback" },
  { value: "wagon", label: "Wagon" },
];

const currentYear = new Date().getFullYear();

const vehicleYear = [];
for (let year = currentYear; year >= 1900; year--) {
  vehicleYear.push(year);
}

const SellCar = () => {
  const [carType, setCarType] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carMileage, setCarMileage] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericPrice = Number(carPrice.replace(/[^0-9.-]+/g, ""));
    const numericMileage = Number(carMileage.replace(/[^0-9.-]+/g, ""));

    if (!carImage) {
      setErrors({ image: "Please upload an image of the car" });
      return;
    }

    try {
      const imageRef = ref(storage, `images/${carImage.name}`);
      await uploadBytes(imageRef, carImage);
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded, URL: ", imageUrl);
      


      const docRef = await addDoc(collection(db, "listings"), {
        type: carType,
        year: carYear,
        make: carMake,
        model: carModel,
        mileage: numericMileage,
        price: numericPrice,
        imageUrl: imageUrl,
      });
      console.log("Document written with ID: ", docRef.id);

      setCarType("");
      setCarYear("");
      setCarMake("");
      setCarModel("");
      setCarMileage("");
      setCarPrice("");
      setErrors({});
      setIsSubmitted(true);
      setCarImage(null);


      if (fileInputRef.current) {
        fileInputRef.current.value = null; 
      }

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handlePriceChange = (e) => {
    let priceValue = e.target.value;
    priceValue = priceValue.replace(/[^0-9]/g, "");

    if (priceValue === "") {
      setCarPrice("");
    } else {
      const numericValue = Number(priceValue);
      const formattedPrice = numericValue.toLocaleString();
      setCarPrice("$" + formattedPrice);
    }
  };

  const handleMileageChange = (e) => {
    let mileageValue = e.target.value;
    mileageValue = mileageValue.replace(/[^0-9]/g, "");

    if (mileageValue === "") {
      setCarMileage("");
    } else {
      const numericValue = Number(mileageValue);
      const formattedMileage = numericValue.toLocaleString();
      setCarMileage(formattedMileage);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCarImage(e.target.files[0]);
    }
  };

  const handleOkClick = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <div className={styles.sell_car_header}>
        <h1>Sell Your Car with Confidence</h1>
        <img src={Malibu} alt="" />
      </div>

      <div className={styles.sell_car_form_section}>
        <div className={styles.success_submit_message}>
          {isSubmitted && (
            <div className={styles.success_message}>
              <h1>Successfully submitted</h1>
              <button className={styles.ok_button} onClick={handleOkClick}>
                OK
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <select
            className={styles.select_type_car}
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            required
          >
            {vehicleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className={styles.select_year}
            value={carYear}
            onChange={(e) => setCarYear(e.target.value)}
            required
          >
            <option value="">Year</option>
            {vehicleYear.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <input
            type="text"
            className={styles.vehicle_make}
            placeholder="Make"
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
            required
          />

          <input
            type="text"
            className={styles.vehicle_model}
            placeholder="Model"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            required
          />

          <input
            type="text"
            className={styles.vehicle_mileage}
            placeholder="Mileage"
            value={carMileage}
            onChange={handleMileageChange}
            required
          />

          <input
            type="text"
            className={styles.vehicle_price}
            placeholder="Price"
            value={carPrice}
            onChange={handlePriceChange}
            required
          />

          <input
            type="file"
            className={styles.vehicle_image}
            onChange={handleImageChange}
            required
          />

          {errors.image && (
            <p className={styles.error_message}>{errors.image}</p>
          )}

          <button className={styles.submit_button} type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SellCar;
