import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// actions
import { roleActions } from '../../../actions';

function RoleForm(props) {

    const action = props.action;
    const [role, setRole] = useState(props.role && action === 'edit' ? props.role : null);
    console.log(role)
    const dispatch = useDispatch();

    // methods
    const setAddRoleModal = (value) => {
        props.setAddRoleModal(value);
    }

    const setEditRoleModal = (value) => {
        props.setEditRoleModal(value);
    }

    return (
        <Formik
            initialValues={{
                name: role ? role.name : '',
                weight: role ? role.weight : 0,
            }}

            onSubmit={async values => {

                if (values.name && values.weight) {
                    if (action === "add") {
                        dispatch(roleActions.addRole(values));
                        setAddRoleModal(false);
                        props.setSuccessModal(true);
                    } else if (action === "edit") {
                        dispatch(roleActions.updateRole(values, role.rid));
                        setEditRoleModal(false);
                        window.location.reload(true);
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
                                    placeholder="Role name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name && "error"}
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                                <div className="float-right">
                                    <button
                                        type="button"
                                        className="btn btn-secondary mr-2"
                                        onClick={() => {
                                                if (action === "add") {
                                                    setAddRoleModal(false);
                                                } else if (action === "edit") {
                                                    setEditRoleModal(false);
                                                    setRole(null);
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
