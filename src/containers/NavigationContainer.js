import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { useHistory } from 'react-router-dom';import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import NavTheme from '../components/Common/NavigationTheme';

function NavigationContainer() {
    const classes = NavTheme();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : false);
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    const logout = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        history.push("/");
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            {/* <Popover.Content> */}
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => {

                        const loginData = {
                            username: values.email,
                            password: values.password
                        }

                        axios.post('/login', loginData).then(
                            response => {
                                console.log(response);
                                if (response.status === 200) {
                                    sessionStorage.setItem('jwtToken', response.data.jwt);
                                    sessionStorage.setItem('isLoggedIn', true);
                                    setIsLoggedIn(true);

                                    history.push("/admin/users");
                                }
                            }
                        );
                    }}

                    validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Email invalid")
                        .required("Required"),
                    password: Yup.string()
                        .required("No password provided.")
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props;
                        return (
                            <div className='form-page__form-wrapper'>
                                <div className='form-page__form-header'>
                                    <h2 className='form-page__form-heading'>Login</h2>
                                </div>
                                <form onSubmit={handleSubmit} className="loginForm">
                                    <div className='form__field-wrapper'>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder="Enter your email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={(errors.email && touched.email && "error form__field-input") || "form__field-input"}
                                        />
                                        <label htmlFor="email" className='form__field-label'>Email</label>
                                        {errors.email && touched.email && (
                                            <div className="input-feedback">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className='form__field-wrapper'>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={(errors.password && touched.password && "error form__field-input") || "form__field-input"}
                                        />
                                        <label htmlFor="password" className='form__field-label'>Password</label>
                                        {errors.password && touched.password && (
                                            <div className="input-feedback">{errors.password}</div>
                                        )}
                                    </div>
                                    <div className='form__submit-btn-wrapper'>
                                        <button className='form__submit-btn' type="submit" disabled={isSubmitting}>
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            {/* </Popover.Content> */}
        </Popover>
    );

    const navButtons = isLoggedIn ? (
        // <ul className="navbar-nav">
        //     <li className="nav-item">
        //         <NavLink href='/about' className="nav-link">About</NavLink>
        //     </li>
        //     <li className="nav-item">
        //         <NavLink href='/contact' className="nav-link">Contact</NavLink>
        //     </li>
        //     <li className="nav-item">
        //         <NavLink href='#' className="nav-link" onClick={logout}>Logout</NavLink>
        //     </li>
        // </ul>
        <div className="navbar-items">
            <Button color="inherit" className="navbar-item">About</Button>
            <Button color="inherit" className="navbar-item">Contact</Button>
            <Button color="inherit" onClick={logout} className="navbar-item">Logout</Button>
        </div>
    ) : (
        // <ul className="navbar-nav">
        //     <li className="nav-item">
        //         <NavLink href='/about' className="nav-link">About</NavLink>
        //     </li>
        //     <li className="nav-item">
        //         <NavLink href='/contact' className="nav-link">Contact</NavLink>
        //     </li>
        //     <OverlayTrigger trigger="click" placement="bottom" overlay={loginForm}>
        //         <Button color="inherit">Login</Button>
        //     </OverlayTrigger>
        //     <li className="nav-item">
        //         <NavLink href='/register' className="nav-link">Register</NavLink>
        //     </li>
        // </ul>
        <div className="navbar-items">
            <Button color="inherit" className="navbar-item">About</Button>
            <Button color="inherit" className="navbar-item">Contact</Button>
            {/* <OverlayTrigger trigger="click" placement="bottom" overlay={loginForm}> */}
                <Button color="inherit" className="navbar-item" onClick={handleClick}>Login</Button>
            {/* </OverlayTrigger> */}
            {loginForm}
            <Button color="inherit" className="navbar-item">Register</Button>
        </div>
    )

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{ flex: 1 }}>
                        Sample
                    </Typography>
                    {/* Navbar items */}
                    {navButtons}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
    );
}

export default NavigationContainer;
