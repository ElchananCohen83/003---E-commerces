// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwz8PODvfnaPqqUnAH5NW-dIcjg-DMVvw",
  authDomain: "e-commerces-64221.firebaseapp.com",
  projectId: "e-commerces-64221",
  storageBucket: "e-commerces-64221.appspot.com",
  messagingSenderId: "773256238859",
  appId: "1:773256238859:web:f248e35d12a4350649340e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);