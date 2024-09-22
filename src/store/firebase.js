// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCPoA9pomOVJBS2YHpc8wIq7mD0jBaWlic",
    authDomain: "react-meals-6a158.firebaseapp.com",
    databaseURL: "https://react-meals-6a158-default-rtdb.firebaseio.com",
    projectId: "react-meals-6a158",
    storageBucket: "react-meals-6a158.appspot.com",
    messagingSenderId: "835872728016",
    appId: "1:835872728016:web:2bc68a0a01ccb226f84fd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Firebase Authentication and GoogleAuthProvider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db= getFirestore(app);

export { auth, provider , db };
