import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// eslint-disable-next-line
import AppBar from '@material-ui/core/AppBar';

// components
import NavTheme from '../components/Common/NavigationTheme';
import NavigationBar from '../components/Navigation/NavigationBar';
import Sidebar from '../components/Navigation/Sidebar';

function MainContainer() {
    const classes = NavTheme();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavigationBar 
                classes={classes} 
                handleDrawerOpen={handleDrawerOpen} 
                open={open}
            />
            <Sidebar
                classes={classes} 
                handleDrawerClose={handleDrawerClose} 
                open={open}
                theme={theme}
            />
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
    );
}

export default MainContainer;
