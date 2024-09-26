import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const apiKey = process.env.GOOGLE_API_KEY;

// Your Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: 'foodgouda.firebaseapp.com',
  projectId: 'foodgouda',
  storageBucket: 'foodgouda.appspot.com',
  messagingSenderId: '299938056478',
  appId: '1:299938056478:web:b1e45a5f04fd2a944d610f',
  measurementId: "G-3DHM0P1E0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize services
// const analytics = getAnalytics(app);

const storage = getStorage(app);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();


export { auth, provider, db };
