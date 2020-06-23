import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// actions
import { userActions } from '../../actions';

function UserForm(props) {

    const divClasses = props.divClasses;
    const formClasses = props.formClasses;
    const formDivClasses = props.formDivClasses;
    const pageLoc = props.pageLoc;
    const action = props.action;
    const [user, setUsers] = useState(props.user && action === 'edit' ? props.user : null);

    const dispatch = useDispatch();

    const setAddUserModal = (value) => {
        props.setAddUserModal(value);
    }

    const setEditUserModal = (value) => {
        props.setEditUserModal(value);
    }

    return (
        <Formik
            initialValues={{
                name: user ? user.name : '',
                username: user ? user.username : '',
                password: '',
            }}

            onSubmit={async values => {

                delete values.c_password;

                if (values.name && values.username && values.password) {
                    if (action === "add") {
                        dispatch(userActions.register(values));
                    }

                    if (pageLoc !== "register") {
                        if (action === "add") {
                            setAddUserModal(false);
                        }
                        props.setSuccessModal(true);
                    }
                } else {
                    delete values.password;

                    if (action === "edit") {
                        dispatch(userActions.update(values, user.uid));
                        setUsers(null);
                        setEditUserModal(false);
                        window.location.reload(true);
                    }
                }
            }}

            validationSchema={action === "add" && Yup.object().shape({
                name: Yup.string()
                    .required("Required"),
                username: Yup.string()
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
                    <div className={divClasses}>
                        <form onSubmit={handleSubmit} className={formClasses}>
                            <div className={formDivClasses}>
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
                                <label htmlFor="username">Email</label>
                                <input
                                    name="username"
                                    type="email"
                                    placeholder="Enter username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.username && touched.username && "error"}
                                />
                                {errors.username && touched.username && (
                                    <div className="input-feedback">{errors.username}</div>
                                )}
                                <label htmlFor="add-user">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder={ action === "add" ? "Enter your password" : "Leave blank to unchange"}
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
                                    placeholder={ action === "add" ? "Confirm your password" : "Leave blank to unchange"}
                                    value={values.c_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.c_password && touched.c_password && "error"}
                                />
                                {errors.c_password && touched.c_password && (
                                    <div className="input-feedback">{errors.c_password}</div>
                                )}
                                <div className="float-right">
                                    {
                                        pageLoc !== "register" ?
                                            <button
                                                type="button"
                                                className="btn btn-secondary mr-2"
                                                onClick={() => {
                                                        if (action === "add") {
                                                            setAddUserModal(false);
                                                        } else if (action === "edit") {
                                                            setEditUserModal(false);
                                                            setUsers(null);
                                                        }
                                                    }
                                                }
                                            > 
                                                Cancel
                                            </button>
                                        :
                                            null
                                    }
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
    )
}

export default UserForm;