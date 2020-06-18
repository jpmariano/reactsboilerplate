import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import './styles/css/styles.css';
import './styles/bootstrap/css/bootstrap.min.css';

// local Server
axios.defaults.baseURL = 'http://localhost:8080/v1';

ReactDOM.render(
//   <React.StrictMode>
    <App />
//   </React.StrictMode>,
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
