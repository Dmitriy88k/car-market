import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app, db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./profileSettings.module.css";
import { getProfileId } from "../../api";
import { useProfile } from "../../components/hooks/useProfile";

const ProfileInfo = () => {
  const [profileId, setProfileId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const profile = useProfile(profileId);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    getProfileId(currentUser.uid).then((id) => {
      setProfileId(id);
    });
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
    if (!newImageFile || !currentUser || !profileId) return;

    setLoading(true);

    try {
      const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      await uploadBytes(storageRef, newImageFile);
      const downloadURL = await getDownloadURL(storageRef);

      const userDoc = doc(db, "users", profileId);
      await updateDoc(userDoc, { picture: downloadURL });
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
      }
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
          src={previewImage || profile?.picture}
          alt="Profile Picture"
          className={styles.profile_picture}
        />

        <label className={styles.file_input_label}>
          <img
            src={
              previewImage ||
              "https://img.icons8.com/?size=100&id=11772&format=png&color=000000"
            }
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

      <p>
        <span>Name:</span> {profile?.name || "N/A"}
      </p>
      <p>
        <span>Email:</span> {currentUser?.email || "N/A"}
      </p>
      <p>
        <span>Phone:</span> {profile?.phone || "N/A"}
      </p>
    </div>
  );
};

export default ProfileInfo;
