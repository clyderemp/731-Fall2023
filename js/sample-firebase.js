  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA_c6_563vrXPtwh1waN8_joOiy34KXT00",
    authDomain: "sample-dfed8.firebaseapp.com",
    projectId: "sample-dfed8",
    storageBucket: "sample-dfed8.appspot.com",
    messagingSenderId: "459068760625",
    appId: "1:459068760625:web:8e0ce4db2b565a46d2ab10",
    measurementId: "G-V95FHVNWP4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export const db = getFirestore(app);