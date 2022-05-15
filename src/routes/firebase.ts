// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBArDmsWV3HJYfaQnES_Ri4TOOvOqBr7hc',
    authDomain: 'nodeviz-testapp0.firebaseapp.com',
    projectId: 'nodeviz-testapp0',
    storageBucket: 'nodeviz-testapp0.appspot.com',
    messagingSenderId: '450845456306',
    appId: '1:450845456306:web:90e48386a028d8ca7cd6ab',
    measurementId: 'G-WT4LJVJBJY'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);