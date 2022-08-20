import { getStorage } from "firebase/storage";
const { initializeApp} = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth,signInWithPopup,GoogleAuthProvider } = require('firebase/auth');
const firebaseConfig = {
  apiKey: "AIzaSyCaxnLMhTUa9gPAWFV86X0IHdhxBsgu-eY",
  authDomain: "sociabaychat.firebaseapp.com",
  databaseURL: "https://sociabaychat-default-rtdb.firebaseio.com",
  projectId: "sociabaychat",
  storageBucket: "sociabaychat.appspot.com",
  messagingSenderId: "207429628928",
  appId: "1:207429628928:web:33a739e4f8d88e4b1514e5",
  measurementId: "G-R9116DTJ4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();
const popup = signInWithPopup()
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export {auth,popup, provider,storage};
export default db;