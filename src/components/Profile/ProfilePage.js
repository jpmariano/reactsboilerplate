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


function ProfilePage() {
    
    const userInfo = useSelector(state => state.authentication.user);
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
        <section>
            {editUserForm}
            <SuccessModal
                successModal={successModal}
                modalMessage="User successfully added!"
                setSuccessModal={setSuccessModal}
            /> 

            <div className="header">
                <h3>
                    <span>User Information</span>
                    <span className="float-right" style={{ cursor: "pointer"}} onClick={() => {setEditUserModal(true);}}>
                        <FontAwesomeIcon icon={faEdit} className="text-primary"/>
                    </span>
                </h3>
            </div>

            <List className="d-inline">
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Name: " />
                    <ListItemText className="d-inline col-md-6" primary={userInfo.name} />
                </ListItem>
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Email: " />
                    <ListItemText className="d-inline col-md-6" primary={userInfo.username} />
                </ListItem>
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Status: " />
                    <ListItemText className="d-inline col-md-6" primary={userInfo.status === 1 ? 'Active' : 'Inactive'} />
                </ListItem>
            </List>

            <Divider />

            <div className="header pt-3">
                <h3>
                    <span>Member Information</span>
                </h3>
            </div>

            <List className="d-inline">
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Member since: " />
                    <ListItemText className="d-inline col-md-6" primary={dateCreated.toUTCString()} />
                </ListItem>
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Last access: " />
                    <ListItemText className="d-inline col-md-6" primary={dateAccess.toUTCString()} />
                </ListItem>
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Last login: " />
                    <ListItemText className="d-inline col-md-6" primary={dateLogin.toUTCString()} />
                </ListItem>
                <ListItem className="w-50 row">
                    <ListItemText className="d-inline col-md-6" primary="Last changed: " />
                    <ListItemText className="d-inline col-md-6" primary={dateChanged.toUTCString()} />
                </ListItem>
            </List>

            <Divider />

            <div className="header pt-3">
                <h3>
                    <span>Role Information</span>
                </h3>
            </div>

            <List className="d-inline">
                <ListItem className="w-50 row">
                    <ListItemText  className="d-inline col-md-6" primary="Role/s: " />
                    {
                        roles.map((role, index) => (
                            userInfo.roles.includes(role.rid) &&
                            <ListItemText key={index} className="d-inline col-md-6" primary={role.name} />
                        ))
                    }
                </ListItem>
            </List>
        </section>
    );
}

export default ProfilePage