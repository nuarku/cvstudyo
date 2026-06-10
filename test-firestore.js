import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "cv-studyo-app",
  appId: "1:750781716517:web:e96fee934f0d79330747cc",
  storageBucket: "cv-studyo-app.firebasestorage.app",
  apiKey: "AIzaSyB8M24WYLuPE_g3q_0QJfDuXnS1N_TLEgQ",
  authDomain: "cv-studyo-app.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log("Users in Firestore:", querySnapshot.size);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

test().catch(console.error);
