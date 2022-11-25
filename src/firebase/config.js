import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBoF6AyeQX-YhfIom1iHvzsUw2uEgHnaYE",
    authDomain: "instagram-edc03.firebaseapp.com",
    projectId: "instagram-edc03",
    storageBucket: "instagram-edc03.appspot.com",
    messagingSenderId: "387023763494",
    appId: "1:387023763494:web:15aa236cb6dcb176594ee7"
};




const app = initializeApp(firebaseConfig);


export const authCon = getAuth(app);
export const firestoreCon = getFirestore(app);
export const storageCon = getStorage(app);