// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-d5458.firebaseapp.com",
  projectId: "blog-app-d5458",
  storageBucket: "blog-app-d5458.appspot.com",
  messagingSenderId: "517024135421",
  appId: "1:517024135421:web:1cbc3be7fc009254d06694"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);