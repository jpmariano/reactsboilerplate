import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { userActions } from '../../actions';

function LoginForm() {
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
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
                        {alert.message &&
                            <div className={`alert ${alert.type} m-3`}>{alert.message}</div>
                        }
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
    );
}

export default LoginForm;