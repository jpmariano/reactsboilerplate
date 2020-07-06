import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { userActions } from '../../actions';

// material ui
import Typography from '@material-ui/core/Typography';

function ChangePassword(props) {
    
    const dispatch = useDispatch();
    const userInfo = props.userInfo;
    const oldPassword = useSelector(state => state.authentication.checkPassword);
    const alert = useSelector(state => state.alert);

    return (
        <Formik
            initialValues={{
                current_password: '',
                password: '',
                c_password: '',
            }}

            onSubmit={async (values, {resetForm}) => {

                delete values.c_password;

                if (values.password) {
                    console.log(values.password)
                    if (oldPassword) {
                        dispatch(userActions.changePassword(userInfo.uid, {username: userInfo.username}, values));
                        resetForm({values: ''});
                    }
                }
            }}

            validationSchema={Yup.object().shape({
                current_password: Yup.string()
                    .required("Provide current password"),
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
                        {alert.passwordResetMessage &&
                            <div className={`alert ${alert.type} m-3`}>{alert.passwordResetMessage}</div>
                        }
                        <form onSubmit={handleSubmit} className="newPasswordForm">
                            <div className="new-password-form-fields">
                                <Typography variant="h6" noWrap className="text-center">
                                    Change password
                                </Typography>
                                <label htmlFor="add-user">Old Password</label>
                                <input
                                    name="current_password"
                                    type="password"
                                    placeholder="Enter current password"
                                    value={values.current_password}
                                    onChange={handleChange}
                                    onBlur={(e) => {
                                        handleBlur(e);
                                        dispatch(userActions.checkOldPassword(userInfo.uid, e.target.value));
                                    }}
                                    className={
                                        errors.current_password && touched.current_password ? 
                                            "error"
                                        :
                                            oldPassword === false ? "error" : ""
                                    }
                                />
                                {
                                    errors.current_password && touched.current_password ?
                                        (<div className="input-feedback">{errors.current_password}</div>)
                                    :
                                        oldPassword === false && (<div className="input-feedback">Incorrect password</div>)
                                }
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

export default ChangePassword;
