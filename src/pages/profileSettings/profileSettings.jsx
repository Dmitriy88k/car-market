import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; 
import { app, db, storage } from "../../firebase";
import { collection, getDocs, query, where, doc, updateDoc, onSnapshot } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import styles from "./profileSettings.module.css";

async function getDatav2(uid) {
  try {
    const q = query(collection(db, 'users'), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      };
    } else {
      console.error("No user found with UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const ProfileInfo = () => {
  const [profile, setProfile] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('/assets/default-avatar-picture.webp'); // Default image

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe && unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!currentUser) return;

    let unsubscribe;

    getDatav2(currentUser.uid).then((data) => {
      setProfile(data);
      if (data?.picture) {
        setPreviewImage(data.picture); 
      }

      if (data?.id) {
        const userDocRef = doc(db, 'users', data.id);
        unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const updatedData = docSnapshot.data();
            setProfile((prevProfile) => ({
              ...prevProfile,
              ...updatedData
            }));
            if (updatedData.picture) {
              setPreviewImage(updatedData.picture);
            }
          }
        });
        
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);

      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const handleUploadPhoto = async () => {
    if (!newImageFile || !currentUser) return;

    setLoading(true);

    try {
      if (!profile?.id) {
        return;
      }

      const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      await uploadBytes(storageRef, newImageFile);
      const downloadURL = await getDownloadURL(storageRef);
      

      const userDoc = doc(db, 'users', profile.id);
      await updateDoc(userDoc, { picture: downloadURL });
 
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.profile_info}>
      <h1>Profile settings</h1>
      <h3>Account info</h3>
      <div className={styles.profile_photo}>
        <img
          src={previewImage}
          alt="Profile Picture"
          className={styles.profile_picture}
        />

        <label className={styles.file_input_label}>
          
          <img 
            src={newImageFile ? previewImage : "https://img.icons8.com/?size=100&id=11772&format=png&color=000000"} 
            alt="Choose File" 
            className={styles.file_input_icon}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.file_input} 
          />
        </label>
        
        <button className={styles.upload_button} onClick={handleUploadPhoto}>
          {loading ? "Uploading..." : "Upload photo"}
        </button>
      </div>
      
      <p><span>Name:</span> {profile?.name || "N/A"}</p>
      <p><span>Email:</span> {currentUser?.email || "N/A"}</p>
      <p><span>Phone:</span> {profile?.phone || "N/A"}</p>
    </div>
  );
};

export default ProfileInfo;
