import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';

// material ui
import Typography from '@material-ui/core/Typography';

function Reset() {
    return (
        <Formik
            initialValues={{
                username: ''
            }}

            onSubmit={async values => {
                console.log(values);
            }}

            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .email()
                    .required("Required")
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
                    <div className="password-reset-form">
                        <form onSubmit={handleSubmit} className="passwordResetForm">
                            <div className="password-reset-form-fields">
                                <Typography variant="h6" noWrap className="text-center">
                                    Reset Password
                                </Typography>
                                <label htmlFor="username">Email</label>
                                <input
                                    name="username"
                                    type="email"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.username && touched.username && "error"}
                                />
                                {errors.username && touched.username && (
                                    <div className="input-feedback">{errors.username}</div>
                                )}
                                <div className="text-center">
                                    <a type="button" className="btn btn-secondary mr-1 text-white" href="/">
                                        Cancel
                                    </a>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default Reset;
