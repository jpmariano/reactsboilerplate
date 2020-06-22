import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

// actions
import { userActions } from '../../actions';
import { alertActions } from '../../actions';

// helpers
import { history } from '../../helpers';

// forms
import LoginForm from '../Forms/LoginForm';

function NavigationBar(props) {
    // authentication
    const loggedIn = useSelector(state => state.authentication.loggedIn);
    const dispatch = useDispatch();

    // popover
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    // reset login status
    // useEffect(() => { 
    //     dispatch(userActions.logout());
    // }, [dispatch]);

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        if (anchorEl === null) {
            // clear alert on popover close
            dispatch(alertActions.clear());
        }
    }, [dispatch, anchorEl]);

    const logout = () => {
        dispatch(userActions.logout());
        history.push("/");
    }

    const showPopover = Boolean(anchorEl);

    const loginForm = (
        <Popover 
            id="login-popover" 
            className="w-100"
            open={showPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <LoginForm />
        </Popover>
    );

    const navButtons = loggedIn ? (
        <div className="navbar-items">
            <Button color="inherit" onClick={logout} className="navbar-item">Logout</Button>
        </div>
    ) : (
        <div className="navbar-items">
            <Button color="inherit" className="navbar-item" href="/about">About</Button>
            <Button color="inherit" className="navbar-item" href="/contact">Contact</Button>
            <Button color="inherit" className="navbar-item" onClick={handleClick}>Login</Button>
            {loginForm}
            <Button color="inherit" className="navbar-item" href="/register">Register</Button>
        </div>
    )

    return (
        <AppBar
            position="fixed"
            className={clsx(props.classes.appBar, {
                [props.classes.appBarShift]: props.open,
            })}
            id="navigation-bar"
        >
            <Toolbar id="navigation-bar-toolbar">
                {
                    loggedIn ?
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={props.handleDrawerOpen}
                                edge="start"
                                className={clsx(props.classes.menuButton, {
                                    [props.classes.hide]: props.open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap style={{ flex: 1 }} className="navbar-items">
                                <Button color="inherit" className="navbar-item" href="/dashboard">Dashboard</Button>
                            </Typography>
                        </>
                    :
                        <Typography variant="h6" noWrap style={{ flex: 1 }} className="navbar-items">
                            <a className="navbar-brand" href="/">React Boilerplate</a>
                        </Typography>
                }
                {/* Navbar items */}
                {navButtons}
            </Toolbar>
        </AppBar>
    );
}

export default NavigationBar;
