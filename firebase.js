// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaDXbxWWOAhYYpP_eJ1ugIANJaowvC2pA",
  authDomain: "pantrastic-2f141.firebaseapp.com",
  projectId: "pantrastic-2f141",
  storageBucket: "pantrastic-2f141.appspot.com",
  messagingSenderId: "427441684999",
  appId: "1:427441684999:web:26d4e839320a67e43da0a2",
  measurementId: "G-7R3WWPXQ1W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = getFirestore(app);
export {app, getFirestore}