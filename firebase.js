import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAha7V6hHb0nd7_venq4cMPK5OHTCUMB_8",
  authDomain: "android-bc.firebaseapp.com",
  projectId: "android-bc",
  storageBucket: "android-bc.appspot.com",
  messagingSenderId: "941120254975",
  appId: "1:941120254975:web:24d1555630205a77afedca"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};