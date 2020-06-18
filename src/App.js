import React from 'react';
import { Router } from 'react-router-dom';

// My Imports
import Routes from "./Routes";
import Navigation from './containers/NavigationContainer';
import NavTheme from './components/Common/NavigationTheme';


// helpers
import { history } from './helpers';

function App() {
    const classes = NavTheme();

    return (
        <div className={classes.root + " main-container"}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                
        <Router history={history}>
                <Routes />
                </Router>
            </main>
        </div>
    );
}

export default App;
