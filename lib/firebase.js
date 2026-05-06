// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, update, get } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc2CHmeX2l8auo9WjgMLgxo1oWMjQBBgU",
  authDomain: "chatroomapp-7a95f.firebaseapp.com",
  projectId: "chatroomapp-7a95f",
  storageBucket: "chatroomapp-7a95f.firebasestorage.app",
  messagingSenderId: "830766634092",
  appId: "1:830766634092:web:6097393cefcc3cf6603449",
  measurementId: "G-WPR66PLEQY",
  databaseURL: "https://chatroomapp-7a95f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, ref, onValue, push, set, update, get, auth };