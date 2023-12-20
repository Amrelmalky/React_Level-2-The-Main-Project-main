// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// The part related to Authentication 
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE4KzCE-jaf9L87rpQogvIoY5eRltehDI",
  authDomain: "level-2-e5fbe.firebaseapp.com",
  projectId: "level-2-e5fbe",
  storageBucket: "level-2-e5fbe.appspot.com",
  messagingSenderId: "111513370092",
  appId: "1:111513370092:web:ae4ce8da08e2c2cfe514c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
// Authده الجزء الخاص بال
export const auth = getAuth(app); 