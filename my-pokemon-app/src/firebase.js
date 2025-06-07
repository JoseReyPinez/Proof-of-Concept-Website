import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAETGj9q6PUcfHv2ZZzVc-touqzquYGml0",
  authDomain: "newagent-scah.firebaseapp.com",
  projectId: "newagent-scah",
  storageBucket: "newagent-scah.firebasestorage.app",
  messagingSenderId: "380830187243",
  appId: "1:380830187243:web:fbd3a3655b3ebce79508ae",
  measurementId: "G-CLZFSLEJ53"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);