import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// actions
import { roleActions } from '../../../actions';

function RoleForm(props) {

    const action = props.action;
    const [role, setRole] = useState(props.role && action === 'edit' ? props.role : null);

    const dispatch = useDispatch();

    // methods
    const setAddRoleModal = (value) => {
        props.setAddRoleModal(value);
    }

    const setEditRoleModal = (value) => {
        props.setEditRoleModal(value);
    }

    const setConfirmModal = (value) => {
        props.setConfirmModal(true);
    }

    return (
        <Formik
            initialValues={{
                name: role ? role.name : '',
                weight: role ? role.weight : '',
            }}

            onSubmit={async values => {

                if (values.name && values.weight) {
                    if (action === "add") {
                        dispatch(roleActions.addRole(values));
                        setAddRoleModal(false);
                        props.setSuccessModal(true);
                    } else if (action === "edit") {
                        // dispatch(roleActions.updateRole(values, role.pid));
                        // setEditRoleModal(false);
                        // window.location.reload(true);
                    }
                }
            }}

            validationSchema={action === "add" && Yup.object().shape({
                name: Yup.string()
                    .required("Role name is required"),
                weight: Yup.number()
                    .required("Role weight is required"),
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
                    <div className="role-form">
                        <form onSubmit={handleSubmit} className="permissionForm">
                            <div className="role-form-fields">
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
                                <label htmlFor="weight">Weight</label>
                                <input
                                    name="weight"
                                    type="number"
                                    placeholder="Role weight"
                                    value={values.weight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.weight && touched.weight && "error"}
                                />
                                {errors.weight && touched.weight && (
                                    <div className="input-feedback">{errors.weight}</div>
                                )}
                                {
                                    action === 'edit' &&
                                    <div className="float-left">
                                        <button type="button" className="btn btn-danger" onClick={() => {setConfirmModal(true); setEditRoleModal(false)}}>
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
                                                    setAddRoleModal(false);
                                                } else if (action === "edit") {
                                                    // setEditRoleModal(false);
                                                    // setRole(null);
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

export default RoleForm;
