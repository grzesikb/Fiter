import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const dbUsers = collection(db, "users");
export const dbProducts = collection(db, "products");
export const dbUserProducts = collection(db, "userProduct");
export const dbSecurity = collection(db, "security");
