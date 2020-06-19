import React from 'react';
import { Router } from 'react-router-dom';

// My Imports
import Routes from "./Routes";
import Navigation from './containers/NavigationContainer';
import useStyles from './components/Common/useStyles';

// helpers
import { history } from './helpers';

function App() {
    const classes = useStyles();

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
