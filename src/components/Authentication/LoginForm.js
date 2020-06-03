import React, { Component } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';

export default class LoginForm extends Component {

    render() {
        return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
                console.log(values)
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
}
