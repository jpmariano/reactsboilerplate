import React from 'react';
import { Formik } from "formik";

function Filter(props) {
    const roles = props.roles ? props.roles : [];
    const permissions = props.permissions ? props.permissions : [];

    return (
        <Formik
            initialValues={{ pid: -1, status: -1, rid: -1, username: "" }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {props => {
                const {
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <form onSubmit={handleSubmit} className="form-inline">
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
                            <label for="inputPassword2">Status</label>
                            <select className="form-control-plaintext border border-dark rounded">
                                <option value={-1}>&nbsp; — Any —</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </div>
                        <div className="form-group mx-sm-2 mb-2">
                            <label for="inputPassword2">Role</label>
                            <select className="form-control-plaintext border border-dark rounded">
                                <option value={-1}>&nbsp; — Any —</option>
                                {
                                    roles.map((role, index) => (
                                        <option key={index} value={role.rid}>{role.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group mx-sm-2 mb-2">
                            <label for="inputPassword2">Permission</label>
                            <select className="form-control-plaintext border border-dark rounded">
                                <option value={-1}>&nbsp; — Any —</option>
                                {
                                    permissions.map((permission, index) => (
                                        <option key={index} value={permission.pid}>{permission.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
                    </form>
                );
            }}
        </Formik>
    );
}

export default Filter;
