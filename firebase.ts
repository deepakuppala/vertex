// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCUkm3S02Es8KZURffa8VSXd3krEIDS3Ec",
  authDomain: "deepcare-dc612.firebaseapp.com",
  projectId: "deepcare-dc612",
  storageBucket: "deepcare-dc612.appspot.com",
  messagingSenderId: "270799243811",
  appId: "1:270799243811:web:a3c5bb1af3c3456beebf96"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);