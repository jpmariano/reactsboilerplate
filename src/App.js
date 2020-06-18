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
            <Router history={history}>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Routes />
                </main>
            </Router>
        </div>
    );
}

export default App;
