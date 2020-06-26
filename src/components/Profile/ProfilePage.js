import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    const roles = useSelector(state => state.role.items);

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
                <ListItem className="w-50">
                    <ListItemText  className="d-inline" primary="Name: " />
                    <ListItemText  className="d-inline" primary={userInfo.name} />
                </ListItem>
                <ListItem className="w-50">
                    <ListItemText  className="d-inline" primary="Email: " />
                    <ListItemText  className="d-inline" primary={userInfo.username} />
                </ListItem>
                <ListItem className="w-50">
                    <ListItemText  className="d-inline" primary="Status: " />
                    <ListItemText  className="d-inline" primary={userInfo.status === 1 ? 'Active' : 'Inactive'} />
                </ListItem>
                <ListItem className="w-50">
                    <ListItemText  className="d-inline" primary="Member since: " />
                    <ListItemText  className="d-inline" primary={dateCreated.toGMTString()} />
                </ListItem>
            </List>
        </section>
    );
}

export default ProfilePage