// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr0yV1OSW9WHuRq4lf-sQRSXLvG0OLvHE",
  authDomain: "upload-image-demo-62516.firebaseapp.com",
  projectId: "upload-image-demo-62516",
  storageBucket: "upload-image-demo-62516.appspot.com",
  messagingSenderId: "872982596672",
  appId: "1:872982596672:web:13c2613f6fd49a21f423a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)