import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDvHuiqzieRUAPxj_tmMfHrrovdtEp2ZkU",
  authDomain: "coffee-log-12565.firebaseapp.com",
  projectId: "coffee-log-12565",
  storageBucket: "coffee-log-12565.appspot.com",
  messagingSenderId: "124697908043",
  appId: "1:124697908043:web:00d3a96bf378d07a304ece",
  measurementId: "G-1WXXY2KZ2J",
});

getAuth(firebaseApp);
getFirestore(firebaseApp);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
