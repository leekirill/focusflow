import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQuWkiyxKU7kQeLgUxlNSqVL2byTk9V1I",
  authDomain: "focus-flow-todo-app.firebaseapp.com",
  databaseURL: "https://focus-flow-todo-app-default-rtdb.firebaseio.com",
  projectId: "focus-flow-todo-app",
  storageBucket: "focus-flow-todo-app.appspot.com",
  messagingSenderId: "889728249957",
  appId: "1:889728249957:web:d7c83c49c47e2697c8d68c",
  measurementId: "G-TCV4TDYL6F",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
