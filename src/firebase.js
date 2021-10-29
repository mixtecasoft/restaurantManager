import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOhGMxycROgkDI7OaChtY_5AP-KZ0F6Xo",
  authDomain: "cachimbos-da52b.firebaseapp.com",
  projectId: "cachimbos-da52b",
  storageBucket: "cachimbos-da52b.appspot.com",
  messagingSenderId: "1049609103895",
  appId: "1:1049609103895:web:c915bb43c330e212b60a52",
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
