import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// DINA UPPGIFTER HÄR
const firebaseConfig = {
    apiKey: "AIzaSyDjPc5G8c3Rd-PjenyTn88evK7IDhkq2oo",
    authDomain: "scrum-board-9b631.firebaseapp.com",
    databaseURL: "https://scrum-board-9b631-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "scrum-board-9b631",
    storageBucket: "scrum-board-9b631.firebasestorage.app",
    messagingSenderId: "642099648314",
    appId: "1:642099648314:web:80252ad11739d6d8e9a203"
  };

// Initiera Firebase
const app = initializeApp(firebaseConfig);

// Initiera databasen
const database = getDatabase(app);

// Exportera referenser du vill använda
export const membersRef = ref(database, "/members");
export const assignmentsRef = ref(database, "/assignments");
