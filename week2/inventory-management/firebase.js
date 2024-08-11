// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnrP8HiPimJEy6G7VB80l7vl_KEi_zf5w",
  authDomain: "inventory-management-751e0.firebaseapp.com",
  projectId: "inventory-management-751e0",
  storageBucket: "inventory-management-751e0.appspot.com",
  messagingSenderId: "546455251916",
  appId: "1:546455251916:web:7ff54bb4668c51e697cb69",
  measurementId: "G-YBDWM8QLLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}