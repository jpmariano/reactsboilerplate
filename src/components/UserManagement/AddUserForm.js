import React, { Component } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';

class AddUserForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    name: this.state.name ? this.state.name : '',
                    email: this.state.email ? this.state.email : '',
                    password: this.state.password ? this.state.password : '',
                }}

                onSubmit={async values => {
                    alert(JSON.stringify(values, null, 2));
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
                        <div className="add-form">
                            <form onSubmit={handleSubmit} className="addUserForm">
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
                                <label htmlFor="add-user">Password</label>
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
                                <label htmlFor="add-user">Confirm Password</label>
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
                                    Submit
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        )
    }
}

export default AddUserForm;