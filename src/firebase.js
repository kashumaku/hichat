// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "chat-app-117a8.firebaseapp.com",
    projectId: "chat-app-117a8",
    storageBucket: "chat-app-117a8.appspot.com",
    messagingSenderId: "22429309687",
    appId: "1:22429309687:web:55dc0c9216237e588d51f2",
    measurementId: "G-F9EHP8BRRR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
