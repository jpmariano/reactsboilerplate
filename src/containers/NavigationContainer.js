import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';

// material ui
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line
import AppBar from '@material-ui/core/AppBar';

// components
import NavigationBar from '../components/Navigation/NavigationBar';
import Sidebar from '../components/Navigation/Sidebar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
}));


function MainContainer() {
    const classes = useStyles();
    const theme = useTheme();
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
