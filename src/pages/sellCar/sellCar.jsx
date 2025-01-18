import { useEffect, useState, useRef } from "react";
import styles from "../sellCar/sellCar.module.css";
import Malibu from "../../assets/chevrolet_malibu.png";
import Cloud from "../../assets/cloud.png";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const fuelOptions = [
  { value: "", label: "Fuel type" },
  { value: "gasoline", label: "Gasoline"},
  { value: "diesel", label: "Diesel"},
  { value: "hybrid", label: "Hybrid"},
  { value: "electric", label: "Electric"},
]

const driveTrainOptions = [
  {value: "", label: "Drivetrain"},
  {value: "Front-Wheel Drive (FWD)", label: "Front-Wheel Drive (FWD)"},
  {value: "Rear-Wheel Drive (RWD)", label: "Rear-Wheel Drive (RWD)"},
  {value: "All-Wheel Drive (AWD)", label: "All-Wheel Drive (AWD)"},
  {value: "Four-Wheel Drive (4WD)", label: "Four-Wheel Drive (4WD)"},
]

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
  const [carImages, setCarImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carColor, setCarColor] = useState("");
  const fileInputRef = useRef(null);
  const [fuelType, setFuelType] = useState([]);
  const [driveTrain, setDriveTrain] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isSubmitted]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericPrice = Number(carPrice.replace(/[^0-9.-]+/g, ""));
    const numericMileage = Number(carMileage.replace(/[^0-9.-]+/g, ""));

    if (carImages.length === 0) {
      setErrors({ image: "Please upload an image of the car" });
      return;
    }

    try {
      const imageUrls = await Promise.all(
        carImages.map(async (image) => {
          const imageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        })
      );

      const docRef = await addDoc(collection(db, "listings"), {
        type: carType,
        year: carYear,
        make: carMake,
        model: carModel,
        mileage: numericMileage,
        price: numericPrice,
        images: imageUrls,
        color: carColor,
        fuel: fuelType,
        drivetrain: driveTrain,
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
      setCarImages([]);
      setImagePreviews([]);
      setCarColor("");
      setFuelType([]);
      setDriveTrain([]);

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
      const formattedMileage = numericValue.toLocaleString("en-US");
      setCarMileage(formattedMileage);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = files.length + carImages.length;

    if (totalFiles > 5) {
      setErrors({ image: "You can only upload a maximum of 5 images" });
      return;
    }

    setCarImages((prevImages) => [...prevImages, ...files]);

    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((urls) => {
      setImagePreviews((prevPreviews) => [...prevPreviews, ...urls]);
      setErrors({});
    });
  };

  const handleOkClick = () => {
    setIsSubmitted(false);
    navigate("/used-cars");
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(carImages);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    const reorderedPreviews = Array.from(imagePreviews);
    const [removedPreview] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, removedPreview);

    setCarImages(reorderedImages);
    setImagePreviews(reorderedPreviews);
  };

  return (
    <div>
      <div className={styles.sell_car_header}>
        <h1>Sell Your Car with Confidence</h1>
        <img src={Malibu} alt="" />
      </div>

      <div className={styles.sell_car_form_section}>
        {isSubmitted && (
          <div className={styles.success_submit_message}>
            <div className={styles.success_message}>
              <h1>Congratulations!</h1>
              <h5>Your car listing has been successfully submitted</h5>
              <button className={styles.ok_button} onClick={handleOkClick}>
                Continue
              </button>
            </div>
          </div>
        )}
        {/* <button
  type="button"
  onClick={() => setIsSubmitted(true)}
  style={{ margin: "20px", padding: "10px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}
>
  Simulate Submission
</button> */}
        {!isLoggedIn && (
          <p className={styles.login_prompt}>
            Please log in to submit a listing.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Make"
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
            required
            disabled={!isLoggedIn}
          />

          <input
            type="text"
            placeholder="Model"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            required
            disabled={!isLoggedIn}
          />

          <select
            className={styles.select}
            value={carYear}
            onChange={(e) => setCarYear(e.target.value)}
            required
            disabled={!isLoggedIn}
          >
            <option value="">Year</option>
            {vehicleYear.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            required
            disabled={!isLoggedIn}
          >
            {vehicleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Exterior Color"
            value={carColor}
            onChange={(e) => setCarColor(e.target.value)}
            required
            disabled={!isLoggedIn}
          />

          <select
            className={styles.select}
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            required
            disabled={!isLoggedIn}
          >
            {fuelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={driveTrain}
            onChange={(e) => setDriveTrain(e.target.value)}
            required
            disabled={!isLoggedIn}
          >
            {driveTrainOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Mileage"
            value={carMileage}
            onChange={handleMileageChange}
            required
            disabled={!isLoggedIn}
          />

          <input
            type="text"
            placeholder="Price"
            value={carPrice}
            onChange={handlePriceChange}
            required
            disabled={!isLoggedIn}
          />

          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.image_previews}
                  >
                    {carImages.map((image, index) => (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className={styles.image_name}>
                              {" "}
                              <img
                                className={styles.preview_images}
                                src={imagePreviews[index]}
                                alt=""
                              />
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <button
            type="button"
            className={styles.upload_button}
            onClick={() => fileInputRef.current.click()}
          >
            <img src={Cloud} alt="" />
            Upload Images
          </button>

          <input
            type="file"
            className={styles.hidden_file_input}
            ref={fileInputRef}
            onChange={handleImageChange}
            multiple
            style={{ display: "none" }}
            disabled={!isLoggedIn}
          />

          {errors.image && (
            <p className={styles.error_message}>{errors.image}</p>
          )}

          <button
            type="submit"
            className={styles.submit_button}
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellCar;
