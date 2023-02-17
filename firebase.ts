import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbNYYLbmIG8u14WyAUolSYfjbA-ukOsJU",
  authDomain: "chatgpt-messenger-8659c.firebaseapp.com",
  projectId: "chatgpt-messenger-8659c",
  storageBucket: "chatgpt-messenger-8659c.appspot.com",
  messagingSenderId: "66288788879",
  appId: "1:66288788879:web:317811f8387e268e4317fa"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };