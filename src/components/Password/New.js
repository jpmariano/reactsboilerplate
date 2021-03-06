import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// actions
import { userActions } from '../../actions';

// material ui
import Typography from '@material-ui/core/Typography';

function New(props) {
    
    const vkey = props.vkey;
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                password: '',
            }}

            onSubmit={async values => {

                delete values.c_password;

                if (values.password) {
                    console.log(values)
                    dispatch(userActions.resetPassword(vkey, values))
                }
            }}

            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .required("No password provided.")
                    .min(8, "Password is too short - should be 8 characters minimum."),
                c_password: Yup.string().when("password", {
                        is: val => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Both password needs to be the same"
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
                    <div className="new-password-form">
                        <form onSubmit={handleSubmit} className="newPasswordForm">
                            <div className="new-password-form-fields">
                                <Typography variant="h6" noWrap className="text-center">
                                    Type new password
                                </Typography>
                                <label htmlFor="add-user">New Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter new password"
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
                                    placeholder="Confirm new password"
                                    value={values.c_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.c_password && touched.c_password && "error"}
                                />
                                {errors.c_password && touched.c_password && (
                                    <div className="input-feedback">{errors.c_password}</div>
                                )}
                                <div className="text-center">
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

export default New;
