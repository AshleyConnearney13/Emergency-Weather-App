// Import the functions you need from the SDKs you need\
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrLnLfMOtjmUtoVAh8izRCpYWu-0H8Iq0",
    authDomain: "welter-1ae4f.firebaseapp.com",
    projectId: "welter-1ae4f",
    storageBucket: "welter-1ae4f.appspot.com",
    messagingSenderId: "1766760836",
    appId: "1:1766760836:web:9b0d3ffe81984f97bb7dd1",
    measurementId: "G-DXKGRBGEX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth };
export { db };