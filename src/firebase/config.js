import { FB_API_KEY, FB_APP_ID } from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: "react-native-social-a2505.firebaseapp.com",
  projectId: "react-native-social-a2505",
  storageBucket: "react-native-social-a2505.appspot.com",
  messagingSenderId: "714324893287",
  appId: FB_APP_ID,
  measurementId: "G-89PM0T0598",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
