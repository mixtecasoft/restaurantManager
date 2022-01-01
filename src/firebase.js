import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Firebase configuration

const firebaseConfig = {
   apiKey: "AIzaSyBOhGMxycROgkDI7OaChtY_5AP-KZ0F6Xo",
   authDomain: "cachimbos-da52b.firebaseapp.com",
   projectId: "cachimbos-da52b",
   storageBucket: "cachimbos-da52b.appspot.com",
   messagingSenderId: "1049609103895",
   appId: "1:1049609103895:web:c915bb43c330e212b60a52",
};

//Luis Database
// const firebaseConfig = {
//    apiKey: "AIzaSyCWb9IymwNxvnGzk8rzlIaANUoBlKC_zPI",
//    authDomain: "cachimbos-a554f.firebaseapp.com",
//    projectId: "cachimbos-a554f",
//    storageBucket: "cachimbos-a554f.appspot.com",
//    messagingSenderId: "461249153282",
//    appId: "1:461249153282:web:98dac49d996a6c04371a1b",
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
