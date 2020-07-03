import React from 'react';
import { Formik } from "formik";
import { useDispatch } from 'react-redux';

// actions
import { userActions } from '../../actions';

function Filter(props) {
    const roles = props.roles ? props.roles : [];
    const permissions = props.permissions ? props.permissions : [];
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ pid: -1, status: -1, rid: -1, username: "" }}
            onSubmit={(values) => {
                // console.log(values);
                dispatch(userActions.filter(values));
            }}
        >
            {props => {
                const {
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue
                } = props;
                return (
                    <form onSubmit={handleSubmit} className="form-inline">
                        <div className="row mr-0 ml-0 mb-2">
                            <div className="form-group mr-sm-2 mb-2">
                                <label for="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control-plaintext border border-dark rounded"
                                    id="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="form-group mx-sm-2 mb-2">
                                <label for="status">Status</label>
                                <select onChange={(e) => {setFieldValue("status", e.target.value); console.log(e.target.value)}} className="form-control-plaintext border border-dark rounded">
                                    <option value={-1}>&nbsp; — Any —</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>
                            <div className="form-group mx-sm-2 mb-2">
                                <label for="role">Role</label>
                                <select onChange={(e) => {setFieldValue("rid", e.target.value); console.log(e.target.value)}} className="form-control-plaintext border border-dark rounded">
                                    <option value={-1}>&nbsp; — Any —</option>
                                    {
                                        roles.map((role, index) => (
                                            <option key={index} value={role.rid}>{role.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group mx-sm-2 mb-2">
                                <label for="permission">Permission</label>
                                <select onChange={(e) => {setFieldValue("pid", e.target.value); console.log(e.target.value)}} className="form-control-plaintext border border-dark rounded">
                                    <option value={-1}>&nbsp; — Any —</option>
                                    {
                                        permissions.map((permission, index) => (
                                            <option key={index} value={permission.pid}>{permission.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="d-block btn btn-primary">Apply</button>
                    </form>
                );
            }}
        </Formik>
    );
}

export default Filter;
