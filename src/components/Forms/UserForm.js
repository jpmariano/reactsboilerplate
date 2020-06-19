import React from 'react';
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

    const dispatch = useDispatch();

    const setModalShow = (value) => {
        props.setModalShow(value);
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
            }}

            onSubmit={async values => {

                const userData = {
                    name: values.name,
                    username: values.email,
                    password: values.password,
                }
                console.log(userData);
                if (values.name && values.email && values.password) {
                    dispatch(userActions.register(userData));

                    if (pageLoc !== "register") {
                        props.setModalShow(false);
                        props.setSuccessModal(true);
                    }
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
                                <div className="float-right">
                                    {
                                        pageLoc !== "register" ?
                                            <button type="button" className="btn btn-secondary mr-2" onClick={() => setModalShow(false)}> 
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
