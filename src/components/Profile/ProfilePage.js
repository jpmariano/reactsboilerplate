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
                            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="user-profile"/>
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