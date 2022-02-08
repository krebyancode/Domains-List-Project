import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8Gf-fxQiHq0jRQx5eJwWRCSKCN5HIxSg",
  authDomain: "sign-up-app-1cee8.firebaseapp.com",
  projectId: "sign-up-app-1cee8",
  storageBucket: "sign-up-app-1cee8.appspot.com",
  messagingSenderId: "832513744046",
  appId: "1:832513744046:web:178ba9e03ba8eccb66613f",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
