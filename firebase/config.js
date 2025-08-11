import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "firegram-d1340.firebaseapp.com",
  projectId: "firegram-d1340",
  storageBucket: "firegram-d1340.appspot.com",
  messagingSenderId: "375861097503",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
console.log(process.env);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);

export { projectStorage, projectFirestore, serverTimestamp, projectAuth };