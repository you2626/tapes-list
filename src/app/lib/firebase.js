// src/app/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestoreを使用する場合
import { getAuth } from "firebase/auth"; // 認証を使用する場合

const firebaseConfig = {
    apiKey: "AIzaSyDMPrtYh-Es5qrL2rcmufx9t74s_fQtigw",
    authDomain: "tapes-list.firebaseapp.com",
    projectId: "tapes-list",
    storageBucket: "tapes-list.appspot.com",
    messagingSenderId: "160020865215",
    appId: "1:160020865215:web:8516767c4a8a98e948e60a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
