import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "cv-studyo-app",
  appId: "1:750781716517:web:e96fee934f0d79330747cc",
  storageBucket: "cv-studyo-app.firebasestorage.app",
  apiKey: "AIzaSyB8M24WYLuPE_g3q_0QJfDuXnS1N_TLEgQ",
  authDomain: "cv-studyo-app.firebaseapp.com",
  messagingSenderId: "750781716517",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
