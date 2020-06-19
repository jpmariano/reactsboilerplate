import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';

// eslint-disable-next-line
import AppBar from '@material-ui/core/AppBar';

// components
import AppStyles from '../components/Common/AppStyles';
import NavigationBar from '../components/Navigation/NavigationBar';
import Sidebar from '../components/Navigation/Sidebar';

function MainContainer() {
    const theme = useTheme();
    const classes = AppStyles();
    const [open, setOpen] = useState(false);
    const loggedIn = useSelector(state => state.authentication.loggedIn);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline />
            <NavigationBar 
                classes={classes} 
                handleDrawerOpen={handleDrawerOpen} 
                open={open}
            />
            {
                loggedIn ?
                    <Sidebar
                        classes={classes} 
                        handleDrawerClose={handleDrawerClose} 
                        open={open}
                        theme={theme}
                    />
                :
                    null
            }
        </>
    );
}

export default MainContainer;
