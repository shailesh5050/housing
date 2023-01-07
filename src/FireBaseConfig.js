// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAptLPeaY_l6Qvmy1VRQyCWO8Pz8eQx0",
  authDomain: "house-marketplace-app-6e58a.firebaseapp.com",
  projectId: "house-marketplace-app-6e58a",
  storageBucket: "house-marketplace-app-6e58a.appspot.com",
  messagingSenderId: "536561134033",
  appId: "1:536561134033:web:9d0366b801c7c939fe18f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();