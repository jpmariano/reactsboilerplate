import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// My Imports
import Routes from "./Routes";
// import Navbar from './components/NavigationBar/Navbar';
import Navigation from './containers/NavigationContainer';

function App() {
    return (
        <Router>
            <Navigation />
            {/* <Navbar /> */}
            <Routes />
        </Router>
    );
}

export default App;
