import React from 'react';
import { Formik } from "formik";

function Filter() {

    return (
        <Formik
            initialValues={{ pid: "", status: "", rid: "", username: "" }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
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
                                <button className='form__submit-btn d-inline' type="submit">
                                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                                <a className='float-right d-inline pt-2 pl-2 pb-2' href='/password-reset'>Forgot password?</a>
                            </div>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default Filter;
