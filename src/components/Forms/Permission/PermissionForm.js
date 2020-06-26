import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// actions
import { permissionActions } from '../../../actions';

function PermissionForm(props) {

    const action = props.action;
    const [permission, setPermission] = useState(props.permission && action === 'edit' ? props.permission : null);

    const dispatch = useDispatch();

    // methods
    const setAddPermissionModal = (value) => {
        props.setAddPermissionModal(value);
    }

    const setEditPermissionModal = (value) => {
        props.setEditPermissionModal(value);
    }

    const setConfirmModal = (value) => {
        props.setConfirmModal(true);
    }

    return (
        <Formik
            initialValues={{
                name: permission ? permission.name : '',
                weight: permission ? permission.weight : 0,
            }}

            onSubmit={async values => {

                if (values.name && values.weight) {
                    if (action === "add") {
                        dispatch(permissionActions.addPermission(values));
                        setAddPermissionModal(false);
                        props.setSuccessModal(true);
                    } else if (action === "edit") {
                        dispatch(permissionActions.updatePermission(values, permission.pid));
                        setEditPermissionModal(false);
                        window.location.reload(true);
                    }
                }
            }}

            validationSchema={action === "add" && Yup.object().shape({
                name: Yup.string()
                    .required("Permission name is required"),
                weight: Yup.number()
                    .required("Permission weight is required"),
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
                    <div className="permission-form">
                        <form onSubmit={handleSubmit} className="permissionForm">
                            <div className="permission-form-fields">
                                <label htmlFor="name">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Permisson name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name && "error"}
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                                {
                                    action === 'edit' &&
                                    <div className="float-left">
                                        <button type="button" className="btn btn-danger" onClick={() => {setConfirmModal(true); setEditPermissionModal(false)}}>
                                            Delete
                                        </button>
                                    </div>       
                                }
                                <div className="float-right">
                                    <button
                                        type="button"
                                        className="btn btn-secondary mr-2"
                                        onClick={() => {
                                                if (action === "add") {
                                                    setAddPermissionModal(false);
                                                } else if (action === "edit") {
                                                    setEditPermissionModal(false);
                                                    setPermission(null);
                                                }
                                            }
                                        }
                                    > 
                                        Cancel
                                    </button>
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

export default PermissionForm;
