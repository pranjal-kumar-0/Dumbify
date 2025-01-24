// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAseQXoRvyqTqb30mV9BU4NjXGTf0S2d2s",
  authDomain: "dumbify-468ae.firebaseapp.com",
  projectId: "dumbify-468ae",
  storageBucket: "dumbify-468ae.firebasestorage.app",
  messagingSenderId: "328626237230",
  appId: "1:328626237230:web:0bfd6c00f2b041aec014bf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
