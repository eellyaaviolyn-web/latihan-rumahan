import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZRQRMlPnqHjSGDEXUBUAICMRyiHVzqjE",
  authDomain: "latihan-rumahan-8687d.firebaseapp.com",
  projectId: "latihan-rumahan-8687d",
  storageBucket: "latihan-rumahan-8687d.firebasestorage.app",
  messagingSenderId: "498611240538",
  appId: "1:498611240538:web:5ca71ad9b16cc8dc652263",
  measurementId: "G-4RRS3XWVXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
