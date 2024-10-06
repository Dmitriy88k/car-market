import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; 
import { app, db } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore'; 
import styles from "./profileInfo.module.css";


async function getUserData(uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("User document doesn't exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const userData = await getUserData(user.uid);
        setProfile(userData);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);
    if (loading) {
      return <div>Loading...</div>;
    }
  

  return (
    <div className={styles.profile_info}>
      <h1>Profile settings</h1>
      <h2>Account info</h2>
      <div>
        {profile?.picture ? (
          <img
            src={profile.picture} 
            alt="Profile Picture"
          />
        ) : (
          <img 
            src="default-profile-pic.png" 
            alt="Default Profile" 
          />
        )}
      </div>
      <p><span>Name:</span> {profile?.name|| "N/A"}</p>
      <p><span>Email:</span> {currentUser?.email || "N/A"}</p>
    </div>
  );
}

  
  



export default ProfileInfo;