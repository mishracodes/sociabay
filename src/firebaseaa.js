import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
// const app = firebase.initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = app.auth();
// const provider = firebase.app.GoogleAuthProvider();
// export {auth, provider};
// export default db;

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db