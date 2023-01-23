// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1X40EZvGfVy-xqD2zqRihZE4MBYiQAVE",
  authDomain: "sumnur-acac8.firebaseapp.com",
  projectId: "sumnur-acac8",
  storageBucket: "sumnur-acac8.appspot.com",
  messagingSenderId: "460238765177",
  appId: "1:460238765177:web:c7d547fcabbd512882a8a8",
  measurementId: "G-VDMRJH855B"
};

console.log('test')

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export {app, db, storage, firebaseConfig, auth}