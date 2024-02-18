// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDjz4u22G0Q3k6igSJ6-v5W20tZlwb7A-0",

  authDomain: "skooler-superadmin.firebaseapp.com",

  projectId: "skooler-superadmin",

  storageBucket: "skooler-superadmin.appspot.com",

  messagingSenderId: "840088870379",

  appId: "1:840088870379:web:d2e920ae817534e1390dae",

  measurementId: "G-HSHJR0N7DF",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
