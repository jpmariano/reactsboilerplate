import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

// components
import SuccessModal from '../Alerts/Successful';

function RigesterForm(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successModal, setSuccessModal] = useState(false);
    // const [isRegistered, setIsRegistered] = useState(false);

    // if (isRegistered) {
    //     return <Redirect to="/login" />;
    // }

    return (
        <>
            <Formik
                initialValues={{
                    name: name ? name : '',
                    email: email ? email : '',
                    password: password ? password : '',
                }}

                onSubmit={async values => {

                    setName(values.name);
                    setEmail(values.email);
                    setPassword(values.password);

                    const userData = {
                        name: values.name,
                        username: values.email,
                        password: values.password,
                    }

                    const isTokenValid = sessionStorage.getItem('jwtToken');

                    if (isTokenValid !== "") {
                        axios.post('/register?register=1', userData).then(
                            response => {
                                if (response.status === 200) {
                                    console.log(response);
                                    setSuccessModal(true);
                                }
                            }
                        );
                    }
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required("Required"),
                    email: Yup.string()
                        .email()
                        .required("Required"),
                    password: Yup.string()
                        .required("No password provided.")
                        .min(8, "Password is too short - should be 8 characters minimum."),
                    c_password: Yup.string().when("password", {
                            is: val => (val && val.length > 0 ? true : false),
                            then: Yup.string().oneOf(
                            [Yup.ref("password")],
                            "Both password need to be the same"
                        )
                    })
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
                        <div className="register-form">
                            <form onSubmit={handleSubmit} className="registerForm">
                                <div className="register-form-fields">
                                    <h3 align="center">Register</h3>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Enter fullname"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.name && touched.name && "error"}
                                    />
                                    {errors.name && touched.name && (
                                        <div className="input-feedback">{errors.name}</div>
                                    )}
                                    <label htmlFor="email">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email && touched.email && "error"}
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                    <label htmlFor="register-user">Password</label>
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
                                    <label htmlFor="register-user">Confirm Password</label>
                                    <input
                                        name="c_password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={values.c_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.c_password && touched.c_password && "error"}
                                    />
                                    {errors.c_password && touched.c_password && (
                                        <div className="input-feedback">{errors.c_password}</div>
                                    )}
                                    <button type="submit" disabled={isSubmitting}>
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Formik>
            <SuccessModal modalShow={successModal} modalMessage='Registration successful!' location='register'/>
        </>
    )
}

export default RigesterForm;
