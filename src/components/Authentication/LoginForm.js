import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

function LoginForm() {
    
    const [isLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : false);
    const [tokenExist] = useState(sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : false);
    const history = useHistory();

    if (isLoggedIn && tokenExist) {
        return <Redirect to="/admin/users" />;
    }

    return (
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
                    <form onSubmit={handleSubmit} className="loginForm">
                        <h3 align="center">Login</h3>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && "error"}
                        />
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                        <label htmlFor="email">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password && "error"}
                        />
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                );
            }}
        </Formik>
    )
}

export default LoginForm;
