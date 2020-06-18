import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

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

function NavigationBar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : false);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        setIsLoggedIn(false);
        props.setIsLoggedIn(false);
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
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {

                    // const loginData = {
                    //     username: values.email,
                    //     password: values.password
                    // }

                    // axios.post('/login', loginData).then(
                    //     response => {
                    //         console.log(response);
                    //         if (response.status === 200) {
                    //             sessionStorage.setItem('jwtToken', response.data.body.key[0]);
                    //             sessionStorage.setItem('isLoggedIn', true);
                    //             setIsLoggedIn(true);
                    //             props.setIsLoggedIn(true);

                    //             history.push("/admin/users");
                    //         }
                    //     }
                    // );

                    if (values.email && values.password) {
                        dispatch(userActions.login(values.email, values.password));
                    }
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
                                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Popover>
    );

    const navButtons = isLoggedIn ? (
        <div className="navbar-items">
            <Button color="inherit" className="navbar-item">About</Button>
            <Button color="inherit" className="navbar-item">Contact</Button>
            <Button color="inherit" onClick={logout} className="navbar-item">Logout</Button>
        </div>
    ) : (
        <div className="navbar-items">
            <Button color="inherit" className="navbar-item">About</Button>
            <Button color="inherit" className="navbar-item">Contact</Button>
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
                    isLoggedIn ?
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
                    :
                        null
                }
                <Typography variant="h6" noWrap style={{ flex: 1 }}>
                    <a className="navbar-brand" href="/">Sample</a>
                </Typography>
                {/* Navbar items */}
                {navButtons}
            </Toolbar>
        </AppBar>
    );
}

export default NavigationBar;
