import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSInKovto6BpC8-Gnl-3rHpwTAK_R6R14",
  authDomain: "netflix-abf2b.firebaseapp.com",
  projectId: "netflix-abf2b",
  storageBucket: "netflix-abf2b.appspot.com",
  messagingSenderId: "898702121354",
  appId: "1:898702121354:web:f1e04ec9510b438e8d1073",
  measurementId: "G-8C8YK0DXQW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);