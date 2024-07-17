// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPNSSma03HNFSjey_FeSLep7bFeB-ci4g",
  authDomain: "cat-breed-a70db.firebaseapp.com",
  databaseURL: "https://cat-breed-a70db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cat-breed-a70db",
  storageBucket: "cat-breed-a70db.appspot.com",
  messagingSenderId: "382840896157",
  appId: "1:382840896157:web:2ca26483239d876ca0b274",
  measurementId: "G-ZT3N0G8TPY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
