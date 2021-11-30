import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4C5zzavz4CB8KH8VhUQ6tiVdAhtTfUhU",
  authDomain: "coffee-4ee41.firebaseapp.com",
  projectId: "coffee-4ee41",
  storageBucket: "coffee-4ee41.appspot.com",
  messagingSenderId: "451251549138",
  appId: "1:451251549138:web:e64d24c13218839cfece0b",
  measurementId: "G-J5SD4TG68C",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = getStorage();
var storageRef = ref(storage, "/images");

export { storage, storageRef, firebaseApp as default };
