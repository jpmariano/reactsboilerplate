import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// actions
import { userActions } from '../../actions';
import { roleActions } from '../../actions';

// components
import SuccessModal from '../Alerts/Successful';

// forms
import UserForm from '../Forms/User/UserForm';


function ProfilePage(props) {
    
    const userInfo = props.userInfo;
    const dateCreated = new Date(userInfo.created * 1000);
    const dateAccess = new Date(userInfo.access * 1000);
    const dateChanged = new Date(userInfo.changed * 1000);
    const dateLogin = new Date(userInfo.login * 1000);
    const allRoles = useSelector(state => state.role.items);
    const roles = allRoles ? allRoles : [];

    // modal-related variables
    const [editUserModal, setEditUserModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    
    const dispatch = useDispatch();

    const editUserForm = (
        <Modal
            show={editUserModal}
            onHide={() => setEditUserModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm 
                    setEditUserModal={setEditUserModal} 
                    setSuccessModal={setSuccessModal}
                    divClasses="user-form"
                    formClasses="userForm"
                    formDivClasses="user-form-fields"
                    pageLoc="profile"
                    action="edit"
                    user={userInfo}
                    roles={roles}
                />
            </Modal.Body>
        </Modal>
    );

    // Methods
    useEffect(() => {
        async function fetchData() {
            dispatch(roleActions.getAllRole());
        }

        dispatch(userActions.getById(userInfo.uid));

        fetchData();
    }, [dispatch, userInfo.uid]);
    
    return (
        <section className="mt-5">
            {editUserForm}
            <SuccessModal
                successModal={successModal}
                modalMessage="User successfully added!"
                setSuccessModal={setSuccessModal}
            /> 

            <div className="emp-profile">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="data:image/png;base64,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" alt="user-profile"/>
                            {/* <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                                <span>
                                    {userInfo.name}
                                </span>
                                <span className="float-right">
                                    {userInfo.username}
                                </span>
                            </h5>

                            <Divider />

                            <List className="d-inline">
                                <ListItem className="row">
                                    <ListItemText className="d-inline col-md-6" primary="Status: " />
                                    <ListItemText className="d-inline col-md-6" primary={userInfo.status === 1 ? 'Active' : 'Inactive'} />
                                </ListItem>
                            </List>

                            <div className="header pt-3">
                                <h5>
                                    <span>Member Information</span>
                                </h5>
                            </div>

                            <Divider />

                            <List className="d-inline">
                                <ListItem className="row">
                                    <ListItemText className="d-inline col-md-6" primary="Member since: " />
                                    <ListItemText className="d-inline col-md-6" primary={dateCreated.toUTCString()} />
                                </ListItem>
                                <ListItem className="row">
                                    <ListItemText className="d-inline col-md-6" primary="Last access: " />
                                    <ListItemText className="d-inline col-md-6" primary={dateAccess.toUTCString()} />
                                </ListItem>
                                <ListItem className="row">
                                    <ListItemText className="d-inline col-md-6" primary="Last login: " />
                                    <ListItemText className="d-inline col-md-6" primary={dateLogin.toUTCString()} />
                                </ListItem>
                                <ListItem className="row">
                                    <ListItemText className="d-inline col-md-6" primary="Last changed: " />
                                    <ListItemText className="d-inline col-md-6" primary={dateChanged.toUTCString()} />
                                </ListItem>
                            </List>
                            
                            <div className="header pt-3">
                                <h5>
                                    <span>Role Information</span>
                                </h5>
                            </div>

                            <Divider />

                            <List className="d-inline">
                                {
                                    roles.map((role, index) => (
                                        userInfo.roles.includes(role.rid) &&
                                        index === 0 ?
                                            <ListItem className="row">
                                                <ListItemText  className="d-inline col-md-6" primary="Role/s: " />
                                                <ListItemText key={index} className="d-inline col-md-6" primary={role.name} />
                                            </ListItem>
                                        :
                                            <ListItem className="row">
                                                <ListItemText  className="d-inline col-md-6" primary="" />
                                                <ListItemText key={index} className="d-inline col-md-6" primary={role.name} />
                                            </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="profile-edit-btn float-right" onClick={() => {setEditUserModal(true);}}>
                            <FontAwesomeIcon icon={faEdit}/> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfilePage