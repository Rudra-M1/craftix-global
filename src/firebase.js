import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeJjbvHTxkBmelmA7-5flu8kV455nUNd4",
  authDomain: "craftixglobal.firebaseapp.com",
  projectId: "craftixglobal",
  storageBucket: "craftixglobal.appspot.com",   // ✅ IMPORTANT
  messagingSenderId: "1092743193153",
  appId: "1:1092743193153:web:13823cccfdf364337a9cc0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
