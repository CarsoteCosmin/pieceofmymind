import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD8dXZHFDLg3_4CHf9wwlyaOYvV98xlA_Y',
  authDomain: 'aboutme-13468.firebaseapp.com',
  projectId: 'aboutme-13468',
  storageBucket: 'aboutme-13468.appspot.com',
  messagingSenderId: '9398604035',
  appId: '1:9398604035:web:d39fda36a761f558f9d936',
  measurementId: 'G-F7PE9GJ69W',
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
