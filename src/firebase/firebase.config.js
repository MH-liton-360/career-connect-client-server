// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBPVTX6LkWuQ6thmBpIiDqpaBjbyu9jHEc",
//     authDomain: "career-connect-82a4e.firebaseapp.com",
//     projectId: "career-connect-82a4e",
//     storageBucket: "career-connect-82a4e.firebasestorage.app",
//     messagingSenderId: "860675320403",
//     appId: "1:860675320403:web:4d7b6d3944d90954bcf4a6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;