// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // For Analytics (optional)
// import { getFirestore } from "firebase/firestore"; // Import Firestore
// import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA-7pUqNjhq8XPui-s6wPTUOcm3GcSap54",
//   authDomain: "notestakingapp-c1af4.firebaseapp.com",
//   projectId: "notestakingapp-c1af4",
//   storageBucket: "notestakingapp-c1af4.appspot.com",
//   messagingSenderId: "298101503314",
//   appId: "1:298101503314:web:d6fb19716e7d87d076b68b",
//   measurementId: "G-2T3KBPG4CR", // Optional
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Analytics if needed
// const analytics = getAnalytics(app);

// // Initialize Firestore
// const firestore = getFirestore(app); // Initialize Firestore

// // Initialize Firebase Authentication
// const auth = getAuth(app); // Initialize Auth

// // Export the initialized app, firestore, and auth
// export { app, firestore, auth };


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // For Analytics (optional)
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics if needed
const analytics = getAnalytics(app);

// Initialize Firestore
const firestore = getFirestore(app); // Initialize Firestore

// Initialize Firebase Authentication
const auth = getAuth(app); // Initialize Auth

// Export the initialized app, firestore, and auth
export { app, firestore, auth };
