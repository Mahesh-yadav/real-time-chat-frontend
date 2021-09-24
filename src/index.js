import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB81OTKUWVDr2T03-t8Y27V8A0yivgdvac',
  authDomain: 'photo-sharing-app-5b230.firebaseapp.com',
  projectId: 'photo-sharing-app-5b230',
  storageBucket: 'photo-sharing-app-5b230.appspot.com',
  messagingSenderId: '993665101321',
  appId: '1:993665101321:web:0d7dd4e2f13e50476612d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
