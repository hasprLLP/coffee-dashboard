import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDOErppj70OHVt9hjYe8YECU82Ea1eVU40',
  authDomain: 'schoolbuskaro.firebaseapp.com',
  projectId: 'schoolbuskaro',
  storageBucket: 'schoolbuskaro.appspot.com',
  messagingSenderId: '107627644799',
  appId: '1:107627644799:web:80787406757af364927c4a',
  measurementId: 'G-G1RHZK1KZN',
}

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = getStorage()
var storageRef = ref(storage, '/')

export { storage, storageRef, firebaseApp as default }
