import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzGBuCtYeg7y__3g392T5-ENnyhfefqCQ",
  authDomain: "fiter-64397.firebaseapp.com",
  projectId: "fiter-64397",
  storageBucket: "fiter-64397.appspot.com",
  messagingSenderId: "975995055990",
  appId: "1:975995055990:web:052b9981ee45d522a5d457",
  measurementId: "G-1BS7RRX6XZ",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const dbUsers = collection(db, "users");
