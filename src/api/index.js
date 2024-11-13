import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "../firebase";

export async function getProfileId(uid) {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const result = querySnapshot.docs[0];
      return result.id
        
      
    } else {
      console.error("No user found with UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}