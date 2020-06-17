import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// My Imports
import Routes from "./Routes";
// import Navbar from './components/NavigationBar/Navbar';
import MainApp from './containers/MainContainer';

function App() {
    return (
        <Router>
            <MainApp />
            <Routes />
        </Router>
    );
}

export default App;
