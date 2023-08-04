// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyF1vY8t71FBaQeXgzpSYXofk1uyjMeEw",
  authDomain: "gps-test-project-b13a0.firebaseapp.com",
  databaseURL: "https://gps-test-project-b13a0-default-rtdb.firebaseio.com",
  projectId: "gps-test-project-b13a0",
  storageBucket: "gps-test-project-b13a0.appspot.com",
  messagingSenderId: "920038043246",
  appId: "1:920038043246:web:e09854d1951c5c504ec07f",
  measurementId: "G-1DC66C8JTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
