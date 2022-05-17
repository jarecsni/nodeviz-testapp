import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from "firebase/firestore";

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
export const db = getFirestore(app);
export const dbRef = collection(db, 'todo');