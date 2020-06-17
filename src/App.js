import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// My Imports
import Routes from "./Routes";
import Navbar from './components/NavigationBar/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes />
        </Router>
    );
}

export default App;
