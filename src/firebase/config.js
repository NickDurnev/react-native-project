import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1tdt94GvpLNxAi_PmP_FvOYRtgvTlnt8",
  authDomain: "react-native-social-a2505.firebaseapp.com",
  projectId: "react-native-social-a2505",
  storageBucket: "react-native-social-a2505.appspot.com",
  messagingSenderId: "714324893287",
  appId: "1:714324893287:web:e23aa9c2dc71ab13effec2",
  measurementId: "G-89PM0T0598",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
