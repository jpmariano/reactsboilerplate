import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// actions
import { permissionActions } from '../../../actions';


function PermissionForm(props) {

    const divClasses = props.divClasses;
    const formClasses = props.formClasses;
    const formDivClasses = props.formDivClasses;
    const action = props.action;
    const [permission, setPermission] = useState(props.user && action === 'edit' ? props.user : null);

    const dispatch = useDispatch();
    
    // methods
    const setAddPermissionModal = (value) => {
        props.setAddPermissionModal(value);
    }

    const setEditPermissionModal = (value) => {
        props.setEditPermissionModal(value);
    }

    return (
        <Formik
            initialValues={{
                name: permission ? permission.name : '',
                weight: permission ? permission.weight : '',
            }}

            onSubmit={async values => {

                if (values.name && values.weight) {
                    if (action === "add") {
                        dispatch(permissionActions.addPermission(values));
                        setAddPermissionModal(false);
                        props.setSuccessModal(true);
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
                    <div className={divClasses}>
                        <form onSubmit={handleSubmit} className={formClasses}>
                            <div className={formDivClasses}>
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
                                    placeholder="Permission weight"
                                    value={values.weight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.weight && touched.weight && "error"}
                                />
                                {errors.weight && touched.weight && (
                                    <div className="input-feedback">{errors.weight}</div>
                                )}
                                <div className="float-right">
                                    {
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
    );
}

export default PermissionForm;
