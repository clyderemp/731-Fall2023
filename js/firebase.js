  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAqBUZ5LbKZg0A8yEvrYTYrHXsawqCZyNc",
    authDomain: "coursemanager-2a0fc.firebaseapp.com",
    databaseURL: "https://coursemanager-2a0fc-default-rtdb.firebaseio.com",
    projectId: "coursemanager-2a0fc",
    storageBucket: "coursemanager-2a0fc.appspot.com",
    messagingSenderId: "794473482381",
    appId: "1:794473482381:web:7138d272f112dfd6fffac4",
    measurementId: "G-HTJZ1QFV7R"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Cloud Firestore and get a reference to the service
  export const db = getFirestore(app);
