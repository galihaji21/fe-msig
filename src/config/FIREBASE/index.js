import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: "AIzaSyCQ2Ke8_XJsbckBIoYtL-DI9LC62GQRuA0",
  authDomain: "jersipedia-327f8.firebaseapp.com",
  databaseURL: "https://jersipedia-327f8-default-rtdb.firebaseio.com",
  projectId: "jersipedia-327f8",
  storageBucket: "jersipedia-327f8.appspot.com",
  messagingSenderId: "619607445451",
  appId: "1:619607445451:web:05892a8b1b9f1fe9a6304e",
  measurementId: "G-KJNDY4C2HZ"
});

const FIREBASE = firebase.firestore;

export default FIREBASE
