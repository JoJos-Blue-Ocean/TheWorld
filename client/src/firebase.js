// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI0Ip7hWc6lh5fWXxzXJbuEmcwCJ-pbl4",
  authDomain: "jojostheworld.firebaseapp.com",
  projectId: "jojostheworld",
  storageBucket: "jojostheworld.appspot.com",
  messagingSenderId: "912901559759",
  appId: "1:912901559759:web:3cbadea0f44dc2c2ae6eba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
