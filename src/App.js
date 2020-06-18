import React from 'react';

// My Imports
import Routes from "./Routes";
import Navigation from './containers/NavigationContainer';
import NavTheme from './components/Common/NavigationTheme';


function App() {
    const classes = NavTheme();

    return (
        <div className={classes.root + " main-container"}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes />
            </main>
        </div>
    );
}

export default App;
