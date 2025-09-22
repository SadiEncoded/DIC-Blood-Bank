import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABmdndcywJHYln1hzqBmxokUzhaGS9yaU",
  authDomain: "dic-blood-bank.firebaseapp.com",
  projectId: "dic-blood-bank",
  storageBucket: "dic-blood-bank.firebasestorage.app",
  messagingSenderId: "852262907952",
  appId: "1:852262907952:web:1b2a0be88cb099576cfdf5",
  measurementId: "G-DPK4SCBDX7"
};

// Initialize Firebase
let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const db = getFirestore(app);
export default app;
