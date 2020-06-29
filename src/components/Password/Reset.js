import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

// material ui
import Typography from '@material-ui/core/Typography';

// actions
import { userActions } from '../../actions';

function Reset() {

    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                username: ''
            }}

            onSubmit={async values => {
                dispatch(userActions.resetPassword(values));
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
                                {alert.passwordResetMessage &&
                                    <div className={`alert ${alert.type} m-3 text-center`}>{alert.passwordResetMessage}</div>
                                }
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
