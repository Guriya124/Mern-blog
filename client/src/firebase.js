// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-78b33.firebaseapp.com",
    projectId: "mern-blog-78b33",
    storageBucket: "mern-blog-78b33.appspot.com",
    messagingSenderId: "523695044647",
    appId: "1:523695044647:web:1ffc1c8b2b9aed8286b602"
};
console.log(import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
