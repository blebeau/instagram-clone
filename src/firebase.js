import firebase from "firebase"


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCtZfPmpctCD0xGiYdaU94G8NMWZfgMxWc",
    authDomain: "instagram-clone-cb0a4.firebaseapp.com",
    projectId: "instagram-clone-cb0a4",
    storageBucket: "instagram-clone-cb0a4.appspot.com",
    messagingSenderId: "180572520992",
    appId: "1:180572520992:web:167b960b828f6ac1f87245",
    measurementId: "G-J1MM76T263"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };