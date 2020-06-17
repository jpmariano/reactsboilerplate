import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavLink, OverlayTrigger, Button, Popover } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : false);
    const history = useHistory();

    const logout = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        history.push("/");
    }

    const loginForm = (
        <Popover id="login-popover" className="w-100">
            {/* <Popover.Title as="h3">Login</Popover.Title> */}
            <Popover.Content>
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
            </Popover.Content>
        </Popover>
    );

    const navButtons = isLoggedIn ? (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink href='/about' className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink href='/contact' className="nav-link">Contact</NavLink>
            </li>
            <li className="nav-item">
                <NavLink href='#' className="nav-link" onClick={logout}>Logout</NavLink>
            </li>
        </ul>
    ) : (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink href='/about' className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink href='/contact' className="nav-link">Contact</NavLink>
            </li>
            <OverlayTrigger trigger="click" placement="bottom" overlay={loginForm}>
                <li className="nav-item">
                    <Button variant="link" className="nav-link border-0">Login</Button>
                </li>
            </OverlayTrigger>
            <li className="nav-item">
                <NavLink href='/register' className="nav-link">Register</NavLink>
            </li>
        </ul>
    )

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <div className="container">
                    <NavLink href={'/'} className="navbar-brand">
                        Sample
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        {navButtons}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    )
}

export default NavBar;
