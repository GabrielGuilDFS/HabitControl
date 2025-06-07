// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsZC5pjNP4f_Ru68bQ6j4zNMkRuwKn870",
  authDomain: "app-habitcontrol.firebaseapp.com",
  projectId: "app-habitcontrol",
  storageBucket: "app-habitcontrol.appspot.com",
  messagingSenderId: "613742936039",
  appId: "1:613742936039:web:694469c04863635a310742",
  measurementId: "G-ZGLG8YVHPR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

