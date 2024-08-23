import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";  // För att använda Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyBPR3FeyIAf8Y3ycp9W-vOtUC7BkhIozoI",
    authDomain: "hannahshistoryhunt.firebaseapp.com",
    databaseURL: "https://hannahshistoryhunt-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hannahshistoryhunt",
    storageBucket: "hannahshistoryhunt.appspot.com",
    messagingSenderId: "21087926780",
    appId: "1:21087926780:web:9ef00aa6d4a0b375dcda79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);  // För Realtime Database

export { app, storage, database };
