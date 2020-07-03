import React from 'react';
import { Formik } from "formik";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// actions
import { userActions } from '../../actions';

function Filter(props) {
    const roles = props.roles ? props.roles : [];
    const permissions = props.permissions ? props.permissions : [];
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ pid: "", status: "", rid: "", username: "" }}
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
                    <form onSubmit={handleSubmit} className="form-inline d-block">
                        <div className="row mr-0 ml-0 mb-2">
                            <div className="form-group mr-sm-2 mb-2">
                                <label className="font-weight-bold" for="username">Username</label>
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
                                <label className="font-weight-bold" for="status">Status</label>
                                <select onChange={(e) => {setFieldValue("status", e.target.value);}} className="form-control-plaintext border border-dark rounded">
                                    <option value={""}>&nbsp; — Any —</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>
                            <div className="form-group mx-sm-2 mb-2">
                                <label className="font-weight-bold" for="role">Role</label>
                                <select onChange={(e) => {setFieldValue("rid", e.target.value);}} className="form-control-plaintext border border-dark rounded">
                                    <option value={""}>&nbsp; — Any —</option>
                                    {
                                        roles.map((role, index) => (
                                            <option key={index} value={role.rid}>{role.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group mx-sm-2 mb-2">
                                <label className="font-weight-bold" for="permission">Permission</label>
                                <select onChange={(e) => {setFieldValue("pid", e.target.value);}} className="form-control-plaintext border border-dark rounded">
                                    <option value={""}>&nbsp; — Any —</option>
                                    {
                                        permissions.map((permission, index) => (
                                            <option key={index} value={permission.pid}>{permission.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="action-btns mb-3">
                            <button type="submit" className="btn btn-primary rounded-btn mr-2 font-weight-bold"><FontAwesomeIcon icon={faCheck}/> Apply</button>
                            <button type="button" className="btn btn-light rounded-btn border border-dark font-weight-bold" onClick={() => window.location.reload(true)}><FontAwesomeIcon icon={faTimes}/> Clear</button>
                        </div>
                    </form>

                );
            }}
        </Formik>
    );
}

export default Filter;
