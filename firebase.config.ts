import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2h--j3B4xj6azVtUNXk7uTHqCX3hS_hw",
  authDomain: "musclemanga-87365.firebaseapp.com",
  projectId: "musclemanga-87365",
  storageBucket: "musclemanga-87365.firebasestorage.app",
  messagingSenderId: "717244891919",
  appId: "1:717244891919:web:b71c76e40c13fda3f3f47a",
  measurementId: "G-37SDREGL9M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
