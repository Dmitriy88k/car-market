import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const useProfile = id => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (!id) return;
    const userDocRef = doc(db, "users", id);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedData = docSnapshot.data();

        setProfile((prev) => {
          return {
            ...prev,
            ...updatedData,
          };
        });
      }
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [id]);

  return profile;
};
