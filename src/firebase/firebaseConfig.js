import { initializeApp } from "firebase/app";

// 🔥 ADD THESE IMPORTS
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔥 YOUR CONFIG (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyDsK6G3B0p28qWCNLH7lM7mGaxtiUj_ycw",
  authDomain: "gurukrupa-store-9aadc.firebaseapp.com",
  projectId: "gurukrupa-store-9aadc",
  storageBucket: "gurukrupa-store-9aadc.firebasestorage.app",
  messagingSenderId: "448091371550",
  appId: "1:448091371550:web:9038545ea26ab4755b560f"
};

// 🔥 INIT APP
const app = initializeApp(firebaseConfig);

// 🔥 EXPORT SERVICES
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);